# Membuat RESTful API dengan HAPI
---
### Modul - modul yg diperlukan
* server.js
* routes.js
* handler.js
* notes.js

### **Hirarki folder**
node-app-back-end
|- node_modules
|- src
| |- handler.js
| |- notes.js
| |- routes.js
| └─ server.js
|- .eslintrc.json
|- package-lock.json
|- package.json
└─ README.md

---
link tautan: http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000
1. Web server dapat menyimpan catatan 
	endpoint: **/notes** method **POST**

	*  Struktur object yang disimpan ke server
	```
	{
		id: string
		title: string
		createdAt: string
		updateAt: string
		tags: array of string
		body: string
	}
	```

	* Berikut contoh nyata
	```
	{
		id: 'notes-V1StGXR8_Z5jdHi6B-myT',
	 	title: 'Sejarah JavaScript',
		createdAt: '2020-12-23T23:00:09.686Z',
		updatedAt: '2020-12-23T23:00:09.686Z',
		tags: ['NodeJS', 'JavaScript'],
		body: 'JavaScript pertama kali dikembangkan oleh Brendan Eich dari Netscape
	}
	```

	* Dalam menyimpan atau menambahkan notes, client akan mengirimkan permintaan ke path dan method tersebut dengan membawa data JSON berikut pada request body:
	```
	{
		"title": "Judul Catatan",
		"tags": ["Tag 1", "Tag 2"],
		"body": "Konten catatan"
	}
	```

	* Untuk properti **id**, **createdAt**, dan **updatedAt** harus diolah di sisi server, jadi client tidak akan mengirimkan itu. Server harus memastikan properti id selalu unik.

	* Jika permintaan client berhasil dilakukan, respons dari server harus memiliki status code **201 (created)** dan mengembalikan data dalam bentuk JSON dengan format berikut:
	```
	{
		"status": "success",
		"message": "Catatan berhasil ditambahkan",
		"data": {
			"noteId": "V09YExygSUYogwWJ"
		}
	}
	```

	* Nilai dari properti **noteId** diambil dari properti **id** yang dibuat secara unik.

	* Bila permintaan gagal dilakukan, berikan status **code 500** dan kembalikan dengan data JSON dengan format berikut:
	```
	{
	  "status": "error",
	  "message": "Catatan gagal untuk ditambahkan"
	}
	```

2. Web server menampilkan catatan
	endpoint: **/notes** method **GET**

	* Ketika client melakukan permintaan pada path **/notes** dengan method **GET**, maka server harus mengembalikan status code **200 (ok)** serta seluruh data notes dalam bentuk array menggunakan JSON. Contohnya seperti ini:
	```
	{
		"status": "success",
		"data": {
			"notes": [
				{
					"id":"notes-V1StGXR8_Z5jdHi6B-myT",
					"title":"Catatan 1",
					"createdAt":"2020-12-23T23:00:09.686Z",
					"updatedAt":"2020-12-23T23:00:09.686Z",
					"tags":[
						"Tag 1",
						"Tag 2"
					],
					"body":"Isi dari catatan 1"
				},
				{
					"id":"notes-V1StGXR8_98apmLk3mm1",
					"title":"Catatan 2",
					"createdAt":"2020-12-23T23:00:09.686Z",
					"updatedAt":"2020-12-23T23:00:09.686Z",
					"tags":[
						"Tag 1",
						"Tag 2"
					],
					"body":"Isi dari catatan 2"
				}
			]
		}
	}
	```

	* Jika belum ada catatan satu pun pada array, server bisa mengembalikan data notes dengan nilai array kosong seperti ini:
	```
	{
		"status": "success",
		"data": {
			"notes": []
		}
	}
	```

	* Selain itu, client juga bisa melakukan permintaan untuk mendapatkan catatan secara spesifik menggunakan **id** melalui path **/notes/{id}** dengan method **GET**. Server harus mengembalikan status code **200 (ok)** serta nilai satu objek catatan dalam bentuk JSON seperti berikut:
	```
	{
		"status": "success",
		"data": {
			"note": {
				"id":"notes-V1StGXR8_Z5jdHi6B-myT",
				"title":"Catatan 1",
				"createdAt":"2020-12-23T23:00:09.686Z",
				"updatedAt":"2020-12-23T23:00:09.686Z",
				"tags":[
					"Tag 1",
					"Tag 2"
				],
				"body":"Isi dari catatan 1"
			}
		}
	}
	```

	* Bila client melampirkan **id** catatan yang tidak ditemukan, server harus merespons dengan status **code 404**, dan data dalam bentuk JSON seperti ini:
	```
	{
		"status": "fail",
		"message": "Catatan tidak ditemukan"
	}
	```

3. Web Server dapat mengubah catatan
	endpoint: **/notes/{id}** method **PUT**

	* Kriteria ketiga adalah web server harus dapat mengubah catatan. Perubahan yang dimaksud bisa berupa judul, isi, ataupun tag catatan. Ketika client meminta perubahan catatan, ia akan membuat permintaan ke path **/notes/{id}**, menggunakan method **PUT**, serta membawa data JSON pada body request yang merupakan data catatan terbaru.

	```
	{
		"title":"Judul Catatan Revisi",
		"tags":[
			"Tag 1",
			"Tag 2"
		],
		"body":"Konten catatan"
	}
	```

	* Jika perubahan data berhasil dilakukan, server harus menanggapi dengan status code **200 (ok)** dan membawa data JSON objek berikut pada body respons.
	```
	{
		"status": "success",
		"message": "Catatan berhasil diperbaharui"
	}
	```

	* Perubahan data catatan harus disimpan ke catatan yang sesuai dengan **id** yang digunakan pada path parameter. Bila **id** catatan tidak ditemukan, maka server harus merespons dengan status code **404 (not found)** dan data JSON seperti ini:
	```
	{
		"status": "fail",
		"message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
	}
	```

4. Web Server dapat menghapus catatan
	endpoint: **/notes/{id}** method **DELETE**

	* Kriteria terakhir adalah web server harus bisa menghapus catatan. Untuk menghapus catatan, client akan membuat permintaan pada path **/notes/{id}** dengan method **DELETE**. Ketika permintaan tersebut berhasil, maka server harus mengembalikan status code **200 (ok)** serta data JSON berikut:
	```
	{
		"status": "success",
		"message": "Catatan berhasil dihapus"
	}
	```

	* Catatan yang dihapus harus sesuai dengan **id** catatan yang digunakan client pada path parameter. Bila **id** catatan tidak ditemukan, maka server harus mengembalikan respons dengan status **code 404** dan membawa data JSON berikut:
	```
	{
		"status": "fail",
		"message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
	}
	```
