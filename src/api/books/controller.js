const res = require("express/lib/response")
const { mongodb_client, firebase_admin } = require("../../init")
const uuid = require("uuid")
const { kafka, elasticSearch} = require("../../init")




const addDataToElasticsearch = async (document) => {
    try {
      // Check if Elasticsearch is reachable
      
      // Define the index and document
      const index = 'books';
  
      // Add the document to Elasticsearch

      // Remove _id from the document
        delete document._id;
      const response = await elasticSearch.index({
        index,
        id: document.id,
        body: document
      });
  
      console.log('Document added:', response.result);
  
      // Refresh the index to make the document searchable immediately
    } catch (error) {
      console.error('Error adding data to Elasticsearch:', error);
    }
  }; 

const bookOnKafkaProducer = async (book) => {

    try {

        const producer = kafka.producer();
        const run = async () => {

            await producer.connect();
          
            console.log("Message sending to Kafka");
            await producer.send({
                topic: 'document-create',
                messages: [{
                    value: book
                }],
            });
          
            console.log("Message sent successfully");
            await producer.disconnect();
          };
          
          run().catch(e => console.error('[example/producer] e', e));
        } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports.searchBooks = async (req, res) => {
    const { title, author, genre } = req.query;
    const { workspace_id } = req.query;

    try {
        const filters = [];
        if (title) {
            filters.push({ match: { "volumeInfo.title": title } });
        }
        if (author) {
            filters.push({ match: { "volumeInfo.authors": author } });
        }
        if (genre) {
            filters.push({ match: { "volumeInfo.genre": genre } }); // Replace 'genre' with your actual field name
        }
        
        filters.push({ match: { "workspace_id": workspace_id } });

        const response = await elasticSearch.search({
            index: 'books', // Replace with your actual index name
            body: {
                query: {
                    bool: {
                        must: filters
                    }
                }
            }
        });

        const response_list = []

        console.log('Search results:', response.hits.hits);

        // response.hits.hits.forEach((hit) => {

        response.hits.hits.forEach((hit) => {
            response_list.push(hit._source)
        });

        return res.status(200).json(response_list);
    } catch (error) {
        console.error('Error searching for books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.bookOnKafkaConsumer = async () => {
    try {
        const consumer = kafka.consumer({ groupId: 'test-group' });
        await consumer.connect();
        await consumer.subscribe({ topic: 'document-create', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              console.log("Message received on Kafka: ", {
                value: message.value.toString(),
              });

              addDataToElasticsearch(JSON.parse(message.value.toString()))
            },
          });
    } catch (error) {
        console.log(error)
        throw error;
    }

}


module.exports.addBook = async(req,res) => {
    try {
        const { 
            workspace_id,
            title,
            authors,
            publishedDate,
            description,
            industryIdentifiers,
            pageCount,
            printType,
            maturityRating,
            available_count
        } = req.body;
        const { user_id } = req.auth;
        const x = req.auth.workspace_id
        const book_id = uuid.v4();
        const book = await mongodb_client.collection("books").insertOne({
            kind: "books#volume",
            id: book_id,
            etag: null,
            selfLink: null,
            available_count: available_count,
            volumeInfo: {
                title: title || null,
                authors: authors || [],
                publishedDate: publishedDate || null,
                description: description || null,
                industryIdentifiers: industryIdentifiers || [],
                readingModes: {
                    text: false,
                    image: false
                },
                pageCount: pageCount || null,
                printType: printType || null,
                maturityRating: maturityRating || "NOT_MATURE",
                allowAnonLogging: false,
                contentVersion: null,
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: null,
                    thumbnail: null
                },
                language: "en",
                previewLink: null,
                infoLink: null,
                canonicalVolumeLink: null
            },
            saleInfo: {
                country: "IN",
                saleability: "NOT_FOR_SALE",
                isEbook: false
            },
            accessInfo: {
                country: "IN",
                viewability: "NO_PAGES",
                embeddable: false,
                publicDomain: false,
                textToSpeechPermission: "ALLOWED",
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: null,
                accessViewStatus: "NONE",
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: null
            },
            created_by: user_id,
            created_at: new Date(),
            workspace_id: workspace_id,
        });

        console.log(book)

        const workspace = await mongodb_client.collection("workspaces_book").insertOne({
            workspace_id: workspace_id,
            book_id: book_id,
        });


        const single_book = await mongodb_client.collection("books").findOne({ id: book_id });

        // bookOnKafka(book)
        await bookOnKafkaProducer(JSON.stringify(single_book))


        return res.status(200).send(book);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports.getBooks = async(req,res) => {
    try {
        const { workspace_id } = req.query;
        const books = await mongodb_client.collection("books").find({ workspace_id: workspace_id }).toArray();
        return res.status(200).send(books);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


module.exports.getBook = async(req,res) => {
    try {
        const { book_id } = req.params;
        // Update the book read count
        console.info(book_id)
        await mongodb_client.collection("books").updateOne({ id: book_id }, { $inc: { read_count: 1 } });

        const book = await mongodb_client.collection("books").findOne({ id: book_id });

        // await searchByAuthor("Gajjar")

        return res.status(200).send(book);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


module.exports.deleteBook = async(req,res) => {
    try {
        const { book_id } = req.params;
        const book = await mongodb_client.collection("books").deleteOne({ id: book_id });
        return res.status(200).send(book);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports.updateBook = async(req,res) => {
    try {
        const { book_id } = req.params;
        const { 
            title,
            authors,
            publishedDate,
            description,
            industryIdentifiers,
            pageCount,
            printType,
            maturityRating,
        } = req.body;
        const book = await mongodb_client.collection("books").updateOne({ id: book_id }, {
            $set: {
                volumeInfo: {
                    title: title || null,
                    authors: authors || [],
                    publishedDate: publishedDate || null,
                    description: description || null,
                    industryIdentifiers: industryIdentifiers || [],
                    pageCount: pageCount || null,
                    printType: printType || null,
                    maturityRating: maturityRating || "NOT_MATURE",
                }
            }
        });
        return res.status(200).send(book);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


module.exports.getBorrowedBooks = async(req,res) => {
    try {
        const { workspace_id } = req.query;
        const borrowed_books = await mongodb_client.collection("borrowed_books").find({ workspace_id: workspace_id }).toArray();
        return res.status(200).send(borrowed_books);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports.getRetunedBooks = async(req,res) => {
    try {
        const { workspace_id } = req.query;
        const returned_books = await mongodb_client.collection("borrowed_books").find({ workspace_id: workspace_id, status: "RETURNED" }).toArray();
        return res.status(200).send(returned_books);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports.borrowBook = async(req,res) => {
    try {
        const { book_id } = req.params;
        const { user_id } = req.auth_id;
        const { due_at, email_id, price, workspace_id } = req.body;
        const { workspace } = req.auth;

        // Check if workspace_id key exists in the user's workspace
        if (!workspace.includes(workspace_id)) {
            return res.status(400).send({
                message: "Invalid workspace"
            })
        }

        const client_user = await firebase_admin.auth().getUserByEmail(email_id);

        if (!client_user) {
            return res.status(400).send({
                message: "User not found"
            })
        }

        // Check if available_count is greater than 0
        const book = await mongodb_client.collection("books").findOne({ id: book_id });
        if (book.available_count <= 0) {
            return res.status(400).send({
                message: "Book not available"
            })
        }

        // Update the book available_count
        await mongodb_client.collection("books").updateOne({ id: book_id }, { $inc: { available_count: -1 } });

        // Add the book to the user's borrowed list
        const borrowed_book = await mongodb_client.collection("borrowed_books").insertOne({
            book_id: book_id,
            due_at: due_at,
            email_id: email_id,
            price: price,
            status: "BORROWED",
            workspace_id: workspace_id,
            borrow_at: new Date(),
        });

        return res.status(200).send(borrowed_book);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports.returnBook = async(req,res) => {
    try {
        const { book_id } = req.params;
        const { user_id } = req.auth_id;
        const { workspace_id, email_id } = req.body;

        // Check if workspace_id key exists in the user's workspace
        if (!workspace.includes(workspace_id)) {
            return res.status(400).send({
                message: "Invalid workspace"
            })
        }

        // Check if the user has borrowed the book
        const borrowed_book = await mongodb_client.collection("borrowed_books").findOne({ 
            book_id: book_id,
            email_id: email_id,
            status: "BORROWED",
         });

        if (!borrowed_book) {
            return res.status(400).send({
                message: "Book not borrowed"
            }
        )}

        // Update the book available_count
        await mongodb_client.collection("books").updateOne({ id: book_id }, { $inc: { available_count: 1 } });

        // Update the borrowed book status
        await mongodb_client.collection("borrowed_books").updateOne({ 
            book_id: book_id,
            email_id: email_id,
         }, { $set: { status: "RETURNED" } });


        return res.status(200).send(borrowed_book);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


module.exports.getBorrowedBookByEmailAndStatus = async(req,res) => {
    try {
        const { email_id, status } = req.query;
        const borrowed_books = await mongodb_client.collection("borrowed_books").find({ email_id: email_id, status: status }).toArray();
        return res.status(200).send(borrowed_books);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}