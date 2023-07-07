const Author = require("../models/author");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

// Anzeige der Liste aller Autoren.
exports.author_list = asyncHandler(async (req, res, next) => {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
    res.render("author_list", {
        title: "Autorenliste",
        author_list: allAuthors,
    });
});

// Detailseite für einen spezifischen Autor anzeigen.
exports.author_detail = asyncHandler(async (req, res, next) => {
    // Details des Autors und all seiner Bücher (parallel) abrufen
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({ author: req.params.id }, "title summary").exec(),
    ]);

    if (author === null) {
        // Keine Ergebnisse.
        const err = new Error("Autor nicht gefunden");
        err.status = 404;
        return next(err);
    }

    res.render("author_detail", {
        title: "Autor Detail",
        author: author,
        author_books: allBooksByAuthor,
    });
});

// Anzeigen des Autoren-Erstellungsformulars bei GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Autor erstellen GET");
});

// Behandlung des Autoren-Erstellens bei POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Autor erstellen POST");
});

// Anzeigen des Autoren-Löschformulars bei GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Autor löschen GET");
});

// Behandlung des Autoren-Löschens bei POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Autor löschen POST");
});

// Anzeigen des Autoren-Aktualisierungsformulars bei GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Autor aktualisieren GET");
});

// Behandlung des Autoren-Aktualisierens bei POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Autor aktualisieren POST");
});