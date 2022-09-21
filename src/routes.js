import {Router} from 'itty-router'
import {upload} from './upload.js'
import {del} from "./delete.js";
import {download} from "./download.js";

const router = Router()

router.get('/', (request) => download(request))
router.post('/', (request) => upload(request))
router.delete('/', (request) => del(request))

router.get('/download/', (request) => download(request))
router.post('/upload/', (request) => upload(request))
router.delete('/delete/', (request) => del(request))

router.all('*', () => new Response('File not found', {status: 404}))

addEventListener('fetch', event => event.respondWith(router.handle(event.request)))
