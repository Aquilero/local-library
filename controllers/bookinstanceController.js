const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Book = require("../models/book");


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

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, "title").exec();

    res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks,
    });
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    // Validate and sanitize fields.
    body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
    body("imprint", "Imprint must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("status").escape(),
    body("due_back", "Invalid date")
        .optional({ values: "falsy" })
        .isISO8601()
        .toDate(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
        });

        if (!errors.isEmpty()) {
            // There are errors.
            // Render form again with sanitized values and error messages.
            const allBooks = await Book.find({}, "title").exec();

            res.render("bookinstance_form", {
                title: "Create BookInstance",
                book_list: allBooks,
                selected_book: bookInstance.book._id,
                errors: errors.array(),
                bookinstance: bookInstance,
            });
            return;
        } else {
            // Data from form is valid
            await bookInstance.save();
            res.redirect(bookInstance.url);
        }
    }),
];


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