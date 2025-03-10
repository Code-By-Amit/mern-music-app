const router = require("express").Router()
const { body } = require("express-validator")
const { createArtist, getArtistById, deleteArtistById, updateArtistInfo ,getAllArtist} = require("../controllers/artist.controller")
const { restrictedTo, isAuthenticated } = require("../middlewares/auth")
const upload = require("../middlewares/multer")



router.get('/',getAllArtist)
router.post('/', isAuthenticated ,upload.single('image'), body('name').notEmpty().withMessage("Please Provide name of Artist"), createArtist)
router.get('/:id', getArtistById)
router.delete("/:id", isAuthenticated, restrictedTo(["ADMIN"]), deleteArtistById)
router.patch("/:id",isAuthenticated,restrictedTo(['ADMIN']),updateArtistInfo)

module.exports = router  