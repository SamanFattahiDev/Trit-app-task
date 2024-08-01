import AudioRecorder from "audio-recorder-polyfill";
export default defineNuxtPlugin((nuxtApp) => {
    window.MediaRecorder = AudioRecorder;

})
