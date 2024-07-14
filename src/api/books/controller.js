const res = require("express/lib/response")
const { mongodb_client } = require("../../init")
const uuid = require("uuid")

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

        const book = await mongodb_client.collection("books").insertOne({
            kind: "books#volume",
            id: uuid.v4(),
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
            created_at: new Date()
        });

        const workspace = await mongodb_client.collection("workspaces_book").insertOne({
            _id: workspace_id,
            book_id: book.insertedId
        });

        return res.status(200).send(book);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}