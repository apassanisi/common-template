LostInIn.com

This is a demo e-commerce site built with **Nuxt.js**, **Contentful**, and **Snipcart**. It showcases a list of products fetched from Contentful and integrates Snipcart for e-commerce functionalities.

## Features
- Fetch products from Contentful
- Display product details
- Add products to cart using Snipcart
- Responsive design with Tailwind CSS

## Technologies Used
- **Nuxt.js**: A framework for creating Vue.js applications.
- **Contentful**: A headless CMS to manage and deliver content.
- **Snipcart**: An easy-to-implement e-commerce solution.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vue.js**: The progressive JavaScript framework.
- **Vue Router**: The official router for Vue.js.
- **TypeScript**: A typed superset of JavaScript.

---

## Setup

### Prerequisites
- Node.js (v14 or higher)
- Package Manager: npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```env
CONTENTFUL_SPACE_ID=<your-contentful-space-id>
CONTENTFUL_ACCESS_TOKEN=<your-contentful-access-token>
SNIPCART_API_KEY=<your-snipcart-api-key>
SNIPCART_SECRET_KEY=<your-snipcart-secret-key>
```

---

## Contentful Setup
1. **Sign Up**: Create an account at [Contentful](https://www.contentful.com/).
2. **Create Space**: Create a new space in Contentful.
3. **Content Model**: Define content types (e.g., Product, Artwork, About).
4. **API Keys**: Obtain your Space ID and Access Token from the Contentful web app.

---

## Snipcart Setup
1. **Sign Up**: Create an account at [Snipcart](https://snipcart.com/).
2. **API Keys**: Obtain your API Key and Secret API Key from the Snipcart dashboard.
3. **Integration**: Ensure your Snipcart API keys are correctly set up in your project.

---

## Running the App

### Start Development Server
Start the development server on `http://localhost:3000`:
```bash
npm run dev
```

### Production
Build the application for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Deployment
The project is configured to deploy on **Netlify**. Follow the [Netlify deployment documentation](https://docs.netlify.com/) for detailed instructions.

---

## Netlify Functions Setup
Ensure that the `.netlify/functions-internal/server` directory exists and is correctly configured in your `nuxt.config.ts` file.

---

## Maintenance

### Calendly
Calendly is used for scheduling meetings and managing appointments. Ensure your Calendly account is active and properly configured.

- **Access**: Log in to your Calendly account at [Calendly](https://calendly.com/).
- **Usage**: Embed scheduling links or use the Calendly API for advanced functionalities.

### Snipcart
Snipcart handles the e-commerce functionalities of the site. Regularly check the Snipcart dashboard for order management and payment processing.

- **Access**: Log in to your Snipcart account at [Snipcart](https://snipcart.com/).
- **Usage**: Ensure your Snipcart API keys are correctly configured. Monitor transactions and update product information as needed.

### Contentful
Contentful is used to manage and deliver content for the site. Keep your Contentful space updated with the latest product information.

- **Access**: Log in to your Contentful account at [Contentful](https://www.contentful.com/).
- **Usage**: Use the Contentful web app to manage content or integrate with the Contentful API for dynamic content updates.

---

## Additional Information
For more details, refer to:
- [Nuxt.js Documentation](https://nuxtjs.org/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Snipcart Documentation](https://docs.snipcart.com/)

---

## License
This project is licensed under the [MIT License](LICENSE).

---