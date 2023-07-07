const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

// Anzeige der Liste aller BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate("book").exec();

    res.render("bookinstance_list", {
        title: "Liste der Buchinstanzen",
        bookinstance_list: allBookInstances,
    });
});

// Detailseite für ein spezifisches Buchexemplar anzeigen.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id)
        .populate("book")
        .exec();

    if (bookInstance === null) {
        // Keine Ergebnisse.
        const err = new Error("Buchexemplar nicht gefunden");
        err.status = 404;
        return next(err);
    }

    res.render("bookinstance_detail", {
        title: "Buch:",
        bookinstance: bookInstance,
    });
});

// Anzeigen des Buchinstanzen-Erstellungsformulars bei GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Buchinstanz erstellen GET");
});

// Behandlung des Buchinstanzen-Erstellens bei POST.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Buchinstanz erstellen POST");
});

// Anzeigen des Buchinstanzen-Löschformulars bei GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Buchinstanz löschen GET");
});

// Behandlung des Buchinstanzen-Löschens bei POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Buchinstanz löschen POST");
});

// Anzeigen des Buchinstanzen-Aktualisierungsformulars bei GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Buchinstanz aktualisieren GET");
});

// Behandlung der Buchinstanzen-Aktualisierung bei POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NICHT IMPLEMENTIERT: Buchinstanz aktualisieren POST");
});