const { statusError } = require("../helpers");
const supportedFormats = [ "jpeg", "png", "bmp", "gif", "jpg"];
const uploadChecker = async (req, res, next) => {
    if (!req.file) {
        next(statusError(400, "attach file"));
    }
    try {
        const { originalname } = req.file;
        const idx = originalname.lastIndexOf(".");
        const fileFormat = originalname.slice(idx + 1).toLowerCase();
        if (!supportedFormats.includes(fileFormat)) {
            next(statusError(400, `selected format file: ${originalname} doesn't support, please use this formats ${supportedFormats.join(
                ", ",
            )}!`,
        ),
    );
}
next();
} catch {
statusError(400, "attach file");
}
};
module.exports = uploadChecker; 