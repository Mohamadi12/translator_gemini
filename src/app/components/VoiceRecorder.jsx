"use client";

import { Mic, Square } from "lucide-react";
import React, { useRef, useState } from "react";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBase64, setAudioBase64] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef(null);

  const startRecording = async() =>{
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = (event) =>{
            if(event.data.size > 0){
                chunksRef.current.push(event.data)
            }
        }

        mediaRecorderRef.current.onstop = () =>{
            const audioBlob = new Blob(chunksRef.current, {
                type: 'audio/wav'
            })
            const reader = new FileReader()
            reader.readAsDataURL(audioBlob)
            reader.onloadend = () =>{
                const base64Audio = reader.result
                setAudioBase64()(base64Audio)
            }
            chunksRef.current = []
        }
        mediaRecorderRef.current.start()
        setIsRecording(true)
    } catch (error) {
        console.error('Error accessing microphone error')
    }
  }

  const stopRecording = () =>{
    if(mediaRecorderRef.current && isRecording){
        mediaRecorderRef.current.stop()
        setIsRecording(false)
    }
  }
  const toggleRecording = () => {
    if(isRecording){
        stopRecording()
    }else{
        startRecording()
    }
  };

  return (
    <div className="flex items-center p-4">
      <button
        type="button"
        onClick={toggleRecording}
        className={`w-12 h-12 rounded-full border flex items-center justify-center ${
          isRecording ? "bg-red-500 text-white" : ""
        }`}
      >
        {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
      <input
        type="hidden"
        name="audio"
        value={audioBase64 || ""}
        aria-label="Recorded audio"
      />
    </div>
  );
};

export default VoiceRecorder;
