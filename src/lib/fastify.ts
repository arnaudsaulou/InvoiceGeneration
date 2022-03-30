import fastifyFactory from 'fastify'
import { invoicesRoutes } from '../routes/invoices'
import * as addressSchema from '../schemas/json/address.json'
import * as billerSchema from '../schemas/json/biller.json'
import * as customerSchema from '../schemas/json/customer.json'
import * as itemInvoiceSchema from '../schemas/json/item-invoice.json'

// Create the server
export const server = fastifyFactory({ logger: true })

// Add schema and routes
server
  .addSchema(addressSchema)
  .addSchema(billerSchema)
  .addSchema(customerSchema)
  .addSchema(itemInvoiceSchema)
  .register(invoicesRoutes, { prefix: '/invoices' })

// Override the default error handler
server.setErrorHandler(function (error, request, reply) {
    if(error.code == "500"){
      reply.status(409).send({ ok: false })
    } else {
      reply.status(Number(error.code)).send({ ok: false })
    }    
  })