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
        selectedConversationId: null as null | number

    }),
    getters: {
        getConversations(): IConversation[] {
            return this.conversations
        },
        getSelectedConversationId(): number {
            return this.selectedConversationId
        },
        getSelectedConversation(): IConversation {
            return this.selectedConversation
        }
    },
    actions: {
        setSelectedConversation(conversationId: number) {
            this.selectedConversationId = conversationId
        },
        updateFromTabs(conversations: any) {
            this.conversations = conversations
        },
        deselectChat() {
            this.selectedConversationId = null
        },
        sendMockMessage(message: string, image?: string) {
            const idx = this.conversations.findIndex(e => e.id === this.selectedConversationId)
            if (idx > -1) {
                this.conversations[idx].messages.push({
                    messageId: (Math.ceil(Math.random() * 100)),
                    image: image ? image : null,
                    message: message,
                    isMe: true
                })
            }

        },

    },
});
