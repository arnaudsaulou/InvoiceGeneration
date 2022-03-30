import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Invoice } from '../schemas/types/invoice';
import * as invoiceSchema from "../schemas/json/invoice.json";
import { Server, IncomingMessage, ServerResponse } from "http";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { showInvoice } from "../templates/invoices/show";
import { createPdf } from "../helper/createPdf";

enum MIME_TYPES {
    HTML = 'text/html',
    JSON = 'application/json',
    PDF = 'application/pdf'
}

export async function invoicesRoutes(fastify: FastifyInstance) {

    // Invoice post route
    fastify.route<{ Body: Invoice }>({
        method: 'POST',
        url: "/",
        schema: {
            body: invoiceSchema,
            response: { 200: invoiceSchema }
        },
        handler: async function (request, response): Promise<Invoice> {
            console.log(request.body)
            return invoicePostHandler(request, response);
        }
    })

}

async function invoicePostHandler(
    request: FastifyRequest<{ Body: Invoice; }, Server, IncomingMessage, unknown>,
    response: FastifyReply<Server, IncomingMessage, ServerResponse, { Body: Invoice; }, unknown>) {
    switch (request.headers.accept) {
        case MIME_TYPES.JSON:
            return request.body;
        case MIME_TYPES.PDF:
            return response.type(MIME_TYPES.PDF).send(createPdf(request.body)); ;
        default:
            return response.type(MIME_TYPES.HTML).send(renderToStaticMarkup(await showInvoice(request.body)));
    }
}