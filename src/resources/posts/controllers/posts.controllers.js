import { awaitCatcher } from 'await-catcher'
import { PostModel } from "../models/post.model.js"

export async function createPost(req, res) {
    const body = req.body
    const [postCreated, error] = await awaitCatcher(PostModel.create(body))
    if (error) {
        return res.status(400).json({ status: "error", msg: error.message })
    }
    return res.status(201).json(postCreated)
}

export async function getPosts(req, res) {
    const queryParams = req.query
    const queryObj = {}
    const queryKeys = Object.keys(queryParams)
    if (queryKeys.length > 0) {
        for (const key of queryKeys) {
            if (key === 'age') {
                queryObj[key] = Number(queryParams[key])
                continue
            }
            if (key === "isAdmin") {
                queryObj[key] = queryParams[key] === 'true'
            }
            console.log(key);
        }
    }
    console.log(queryParams)
    console.log(queryObj)
    const [posts, error] = await awaitCatcher(PostModel.find(queryObj, { pets: 0, addresses: 0 }))
    if (error) {
        return res.status(400).json({ status: "error", msg: error.message })
    }
    return res.status(201).json(posts)
}

export async function getPostById(req, res) {
    const id = req.params.id
    const [post, error] = await awaitCatcher(PostModel.findById(id))
    if (!post || error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(post)
}

export async function updatePostById(req, res) {
    const id = req.params.id
    const body = req.body
    const [postUpdated, error] = await awaitCatcher(PostModel.findByIdAndUpdate(id, body, { new: true }))
    if (error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(postUpdated)
}

export async function deletePostById(req, res) {
    const id = req.params.id
    const [postDeleted, error] = await awaitCatcher(PostModel.findByIdAndDelete(id))
    if (error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(postDeleted)
}  