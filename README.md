# TRITAPP Chat Project

There are a few explanations i have to make

## Project It Self

I decided to use Nuxt version 3 and my boiler-plate for faster development and for more convenience since Nuxt gives more options.

## Task Requirements

1. I decided to use tailwind css and daisyui for  prettier UI in the time i had.
2. I used pinia for state management and another package called @pinia-plugin-persistedstate/nuxt. this package can leverage pinia usage since you can tell each of your stores to use either localStorage,sessionStorage or use pinia default behavior, which in my case i used it to handle data in localStorage
3. For uploading images, im creating a ObjectUrl of the file and display it in html but since with every page reload, browser does not save ObjectUrls you cannot preview images you have sent before reloading and you can only preview images you are sending right now
4. Right now you can only send a message as yourself but if you want to preview messages as the other person, in stores/chat.ts in sendMockMessage method change isMe to false
```bash
     sendMockMessage(message: string, image?: string) {
            const idx = this.conversations.findIndex(e => e.id === this.selectedConversationId)
            if (idx > -1) {
                this.conversations[idx].messages.push({
                    messageId: (Math.ceil(Math.random() * 100)),
                    image: image ? image : null,
                    message: message,
                    isMe: true // CHANGE THIS
                })
            }

        },
```
## Project Setup

setup project using npm. make sure you have node.js version > 16.14.2 installed 

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
