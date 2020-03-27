const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Ong', () => {
	beforeEach(async () => {
		await connection.migrate.rollback() // zera banco
		await connection.migrate.latest() //faz migration

	})

	afterAll(async () => {
		await connection.destroy()
	})

	it('should be able to create a new Ong', async () => {
		const response = await request(app)
			.post('/ongs')
			.send({
				"name": "APAD1",
				"email": "contato@apad.com.br",
				"whatsapp": "9999999999",
				"city": "Florianópolis",
				"uf": "SC"
			})

			expect(response.body).toHaveProperty('id')
			expect(response.body.id).toHaveLength(8)
	})
})