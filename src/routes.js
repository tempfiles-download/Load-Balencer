import {Router} from 'itty-router'
import {upload} from './upload.js'
import {del} from "./delete.js";
import {download} from "./download.js";

const router = Router()

router.post("/upload", (request) => upload(request))
router.delete("/delete/", (request) => del(request))
router.get("/download/", (request) => download(request))

router.all("*", () => new Response("Function not found", {status: 400}))

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
})

async function handleRequest(event) {
        return router.handle(event.request)
}
