const fileType = require('file-type');
const fs = require("fs");
const PERMITTED_EXT = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

const verifyImage = function (req, res, next) {
    if (!req.file) {
        return res.status(400).end();
    }
    fs.open(req.file.path, "r", function (err, fd) {
        let buffer = Buffer.alloc(fileType.minimumBytes);
        fs.read(fd, buffer, 0, fileType.minimumBytes, null, function (error, bytesRead, buffer) {
            if (error) {
                console.error(error);
                res.status(500).end()
            } else {
                const ext = fileType(buffer)['ext'];
                // Maybe find a way to store it in a sandbox before checking the type?
                // I couldn't find a way to store it in a sandboxed environment tho..
                if (PERMITTED_EXT.includes(ext)) {
                    next()
                } else {
                    fs.unlink(filepath, err => {
                        if (err) {
                            console.error(err);
                            res.status(500).end()
                        } else {
                            res.status(400).end()
                        }
                    })
                }
            }
        })
    });
};

module.exports = verifyImage;
