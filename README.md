# OCR Image Upload API

This API allows you to upload image files (or PDF files) and perform Optical Character Recognition (OCR) using Tesseract to extract text from the images. The API is built with Node.js and Express and uses `multer` for file uploads and `node-tesseract-ocr` for OCR processing.

## Features

- Upload image files (JPEG, PNG, BMP, TIFF) for OCR processing.
- Convert PDF files to images and then perform OCR.
- Handles file names with spaces by replacing them with dashes.
- Supports CORS for cross-origin requests.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)
- **Tesseract-OCR** (should be installed and available in your system's PATH)
- **ImageMagick** (for PDF to image conversion)

### Installing Tesseract-OCR

- **Linux:** Use your package manager (e.g., `sudo apt-get install tesseract-ocr` for Ubuntu).
- **macOS:** Use Homebrew (`brew install tesseract`).
- **Windows:** Download and install from the [official Tesseract page](https://github.com/tesseract-ocr/tesseract).

### Installing ImageMagick

- **Linux:** Use your package manager (e.g., `sudo apt-get install imagemagick` for Ubuntu).
- **macOS:** Use Homebrew (`brew install imagemagick`).
- **Windows:** Download and install from the [official ImageMagick page](https://imagemagick.org/script/download.php).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KelySaina/node-ocr.git
   cd node-ocr
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

## Dependencies

The following npm packages are used in this project:

- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **multer:** Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **node-tesseract-ocr:** A simple wrapper for Tesseract OCR.
- **cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **child_process (built-in):** Node.js module to spawn and manage system processes, used here for running ImageMagick commands.
- **path (built-in):** Node.js module for working with file and directory paths.
- **fs (built-in):** Node.js module for file system operations, such as reading and writing files.

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

2. **Upload an image or PDF file:**

   Use a tool like [Postman](https://www.postman.com/) or cURL to send a `POST` request to `http://localhost:5000/img-upload` with a file in the `form-data` section using the key `file`.

   Example cURL command:

   ```bash
   curl -X POST -F 'file=@/path/to/your/file.jpg' http://localhost:5000/img-upload
   ```

3. **Receive the OCR result:**

   The API will respond with a JSON object containing the extracted text from the image.

   Example response:

   ```json
   {
     "text": "Extracted text from the image"
   }
   ```

## API Endpoints

### POST `/img-upload`

- **Description:** Upload an image or PDF file for OCR processing.
- **Parameters:**
  - `file` (required): The image or PDF file to be uploaded.
- **Response:**
  - `200 OK`: JSON object containing the extracted text.
  - `400 Bad Request`: If the file type is unsupported.
  - `500 Internal Server Error`: If an error occurs during processing.

## Contributing

If you want to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) - The OCR engine used in this project.
- [ImageMagick](https://imagemagick.org/) - Used for converting PDF files to images.
- [Express.js](https://expressjs.com/) - The web framework used to build the API.
