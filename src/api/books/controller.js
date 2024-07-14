const res = require("express/lib/response")
const { mongodb_client } = require("../../init")
const uuid = require("uuid")
const { kafka } = require("../../init")



const bookOnKafkaProducer = async (book) => {
    try {
        const producer = kafka.producer();
        const run = async () => {
            await producer.connect();
          
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
        } = req.body;
        const { user_id } = req.auth;
        const x = req.auth.workspace_id
        const book_id = uuid.v4();
        const book = await mongodb_client.collection("books").insertOne({
            kind: "books#volume",
            id: book_id,
            etag: null,
            selfLink: null,
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