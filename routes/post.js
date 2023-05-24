const express = require("express")
const router = express.Router()
const controllers = require("../controllers/post")


router.post("/add", controllers.addPost)

router.get("/publishingPosts", controllers.publishingPosts)

router.get("/all", controllers.getPostsAll)

router.get("/updateStatusPost/:post_id", controllers.updateStatusPost)


module.exports = router
