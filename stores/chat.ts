import {defineStore} from "pinia";

export interface IConversation {
    id: number,
    name: string,
    lastMessage: string,
    picture: string,
    messages: IMessage[]
}

export interface IMessage {
    messageId: number,
    message: string,
    isMe: boolean
}

export const useChatStore = defineStore("chat", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        conversations: [
            {
                id: 1,
                name: 'مهدی',
                lastMessage: 'slm',
                picture: '/illustration.png',
                messages: []
            },
            {
                id: 2,
                name: 'سامان',
                lastMessage: 'chtri',
                picture: '/illustration-1.png',
                messages: []
            },
        ] as IConversation[],
        selectedConversation: null as IConversation | null

    }),
    getters: {
        getConversations(): IConversation[] {
            return this.conversations
        },
        getSelectedConversation(): IConversation {
            return this.selectedConversation
        }
    },
    actions: {
        setSelectedConversation(selectedConversation: IConversation) {
            this.selectedConversation = selectedConversation
        },
        deselectChat() {
            // const idx = this.conversations.findIndex(e => e.id === this.selectedConversation.id)
            // if (idx > -1) {
            //     this.conversations[idx].messages = this.selectedConversation.messages
            // }
            this.selectedConversation = null
        },
        sendMockMessage(message: string, image?: string) {
            // const idx = this.conversations.findIndex(e => e.id === this.selectedConversation.id)
            // if (idx > -1) {
            //     this.conversations[idx].messages.push({
            //         messageId: (Math.ceil(Math.random() * 100)),
            //         image: image ? image : null,
            //         message: message,
            //         isMe: true
            //     })
            // }
            this.selectedConversation.messages.push({
                messageId: (Math.ceil(Math.random() * 100)),
                image: image ? image : null,
                message: message,
                isMe: true
            })
        },

    },
});
