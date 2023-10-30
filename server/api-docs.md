## Endpoints

List of Available Endpoints:

- `POST /auth/register`
- `POST /auth/login`

- `GET /movies`
- `GET /movies/images/:id`
- `GET /movies/trailer/:imdb_id`
- `GET /movies/:id`

- `GET /bookmark/`
- `POST /bookmark/:id`
- `DELETE /bookmark/:id`

### POST /auth/register

#### Description

- add or register account

#### Request

- Body
  ```json
  {
    "email": "hahahehe@gmail.com",
    "password": "hahahaha"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": "String",
    "email": "String",
    "access_token": "String"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "Email is required"
  }
  ```

### POST /auth/login

#### Description

- login account

#### Request

- Body
  ```json
  {
    "email": "hahahehe@gmail.com",
    "password": "hahahaha"
  }
  ```

#### Response

_200 - Created_

- Body
  ```json
  {
    "id": "String",
    "email": "String",
    "name": "String",
    "access_token": "String"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### POST /movies

#### Description

- get movies data

#### Response

_200 - Created_

- Body
  ```json
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/2Icjry0xdRSNxrtsBR1F47b9r3u.jpg",
      "genre_ids": [
        28,
        878,
        27
      ],
      "id": 615656,
      "original_language": "en",
      "original_title": "Meg 2: The Trench",
      "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
      "popularity": 6365.282,
      "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
      "release_date": "2023-08-02",
      "title": "Meg 2: The Trench",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 941
    },
    ...
  ]
  ```

### POST /movies/images/:id

#### Description

- get movies images

#### Response

_200 - Created_

- Body
  ```json
  {
    "backdrops": [
      {
        "aspect_ratio": 1.778,
        "height": 2160,
        "iso_639_1": "es",
        "file_path": "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
        "vote_average": 5.39,
        "vote_count": 6,
        "width": 3840
      }
    ],
    "posters": [
      {
        "aspect_ratio": 1.778,
        "height": 2160,
        "iso_639_1": "es",
        "file_path": "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
        "vote_average": 5.39,
        "vote_count": 6,
        "width": 3840
      }
    ],
    "logos": [
      {
        "aspect_ratio": 1.778,
        "height": 2160,
        "iso_639_1": "es",
        "file_path": "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
        "vote_average": 5.39,
        "vote_count": 6,
        "width": 3840
      }
    ]
  }
  ```

### POST /movies/trailer/:imdb_id

#### Description

- get movies trailer (youtube)

#### Response

_200 - Created_

- Body
  ```json
  {
    "youtube": "https://www.youtube.com/watch?v=hXzcyx9V0xw"
  }
  ```

### POST /movies/:id

#### Description

- get movies detail

#### Response

_200 - Created_

- Body
  ```json
  {
    "adult": false,
    "backdrop_path": "/it7yPSgca2VEJyXAqgjfaccgvJm.jpg",
    "belongs_to_collection": null,
    "budget": 200000000,
    "genres": [
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 10749,
        "name": "Romance"
      }
    ],
    "homepage": "https://movies.disney.com/elemental",
    "id": 976573,
    "imdb_id": "tt15789038",
    "original_language": "en",
    "original_title": "Elemental",
    "overview": "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    "popularity": 2723.167,
    "poster_path": "/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
    "production_companies": [
      {
        "id": 2,
        "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
        "name": "Walt Disney Pictures",
        "origin_country": "US"
      },
      {
        "id": 3,
        "logo_path": "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
        "name": "Pixar",
        "origin_country": "US"
      }
    ],
    "production_countries": [
      {
        "iso_3166_1": "US",
        "name": "United States of America"
      }
    ],
    "release_date": "2023-06-14",
    "revenue": 458822015,
    "runtime": 102,
    "spoken_languages": [
      {
        "english_name": "Spanish",
        "iso_639_1": "es",
        "name": "Español"
      },
      {
        "english_name": "English",
        "iso_639_1": "en",
        "name": "English"
      }
    ],
    "status": "Released",
    "tagline": "Opposites react.",
    "title": "Elemental",
    "video": false,
    "vote_average": 7.798,
    "vote_count": 1553,
    "qr": "String"
  }
  ```

### GET /bookmark

#### Description

- get bookmark list

#### Request

- Headers
  ```
  {
    "access_token": "String
  }
  ```

#### Response

_200 - Created_

- Body
  ```json
  [
    {
      "id": 3,
      "UserId": 1,
      "MovieId": 346698,
      "title": "Barbie",
      "createdAt": "2023-08-30T19:48:39.487Z",
      "updatedAt": "2023-08-30T19:48:39.487Z"
    },
    {
      "id": 6,
      "UserId": 1,
      "MovieId": 872585,
      "title": "Oppenheimer",
      "createdAt": "2023-08-30T20:24:45.468Z",
      "updatedAt": "2023-08-30T20:24:45.468Z"
    }
  ]
  ```

### POST /bookmark/:id

#### Description

- add bookmark

#### Request

- Headers

  ```json
  {
    "access_token": "String"
  }
  ```

- body
  ```json
  {
    "title": "String"
  }
  ```

#### Response

_200 - Created_

- Body
  ```json
  {
    "id": 7,
    "UserId": 1,
    "MovieId": 2,
    "title": "coba",
    "updatedAt": "2023-08-30T21:00:17.395Z",
    "createdAt": "2023-08-30T21:00:17.395Z"
  }
  ```

### DELETE /bookmark/:id

#### Description

- delete bookmark by id

#### Response

_200 - Created_

- Body
  ```json
  {
    "message": "Data 7 deleted"
  }
  ```
