import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './WriteMessage.module.scss';
import Attach from '../../../public/Attach.svg?react';
import Emoji from '../../../public/Emoji.svg?react';
import Mic from '../../../public/Mic.svg?react';
import { BlickButton } from '../../ui/BlickButton/BlickButton';
import { usePersonStore } from '../../store/chat';

export const WriteMessage = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [recordAudio, setRecordAudio] = useState(false);
  const [stopRecordAudio, setStopRecordAudio] = useState(false);
  const [recordTimer, setRecordTimer] = useState({
    millisecond: 0,
    second: 0,
    minutes: 0,
  });
  const [intervalId, setIntervalId] = useState<null | ReturnType<typeof setTimeout>>(null);
  const [mediaRecorderGlobal, setMediaRecorderGlobal] = useState<MediaRecorder | null>();

  const firstNameStore = usePersonStore((state) => state.firstName);
  const updateFirstName = usePersonStore((state) => state.updateFirstName)

  // useEffect(() => {
  //   mediaRecorderGlobal?.ondataavailable = (e) => {
  //     setBlobRecorder((prev: Blob[]) => [...prev, e.data]);
  //   };
  // }, [mediaRecorderGlobal, recordAudio]);

  const handleRecordVoice = async () => {
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const blobs: MediaRecorder = [];

        mediaRecorder?.start();
        setMediaRecorderGlobal(mediaRecorder);
        setRecordAudio(true);

        mediaRecorder.addEventListener('dataavailable', (e) => {
          blobs.push(e.data);
        });

        mediaRecorder.addEventListener('stop', async () => {
          const audioBlob = new Blob(blobs, { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);

          console.log(audioBlob, 'audioblob');
          setAudioUrl(audioUrl);
        });

        const id = setInterval(() => {
          setRecordTimer((prev) => {
            if (prev.millisecond < 99) {
              return {
                ...prev,
                millisecond: prev.millisecond + 1,
              };
            }
            if (prev.second < 59) {
              return {
                ...prev,
                second: prev.second + 1,
                millisecond: 0,
              };
            }
            return {
              ...prev,
              second: 0,
              minutes: prev.minutes + 1,
              millisecond: 0,
            };
          });
        }, 10);
        setIntervalId(id);
      })
      .catch((err) => {});
  };

  const handleStopRecordVoice = async () => {
    // if (mediaRecorderGlobal) {
    //   mediaRecorderGlobal.stop();
    //   console.log(mediaRecorderGlobal, 'fine');
    //   setStopRecordAudio(true);
    //   // setRecordAudio(false);
    //   if (intervalId !== null) {
    //     clearInterval(intervalId);
    //   }
    //   setIntervalId(null);
    // }
  };

  const handleContinueRecordVoice = async () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      // создать новый recorder
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        setBlobRecorder((prev: Blob[]) => [...prev, e.data]);
      };

      mediaRecorder.start();

      setStopRecordAudio(false);
    });
  };

  const [audioUrl, setAudioUrl] = useState();

  const handleEndRecordVoice = async () => {
    if (mediaRecorderGlobal) {
      mediaRecorderGlobal.stop();
    }

    setRecordAudio(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        {audioUrl && (
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
          </audio>
        )}
        {!recordAudio && (
          <button className={styles.button} type="button">
            <Attach />
          </button>
        )}
        {recordAudio && <button type="button" className={styles.circleRecordRed} />}
        {!recordAudio && <input placeholder="Write a message..." className={styles.input} />}
        {recordAudio && (
          <div className={styles.input}>{`${recordTimer.minutes.toString().padStart(2, '0')}:${recordTimer.second
            .toString()
            .padStart(2, '0')}:${recordTimer.millisecond.toString().padStart(2, '0')}`}</div>
        )}
      </div>
      <div className={styles.emojiWrapper}>
        <button className={styles.button} type="button">
          <Emoji />
        </button>
        {!recordAudio && (
          <button
            onClick={handleRecordVoice}
            className={cn(styles.button, styles.buttonMicAnimationClick)}
            type="button"
          >
            <Mic />
          </button>
        )}
        {recordAudio && (
          <>
            {!stopRecordAudio && (
              <button type="button" onClick={handleStopRecordVoice}>
                stop
              </button>
            )}
            {stopRecordAudio && (
              <button onClick={handleContinueRecordVoice} type="button">
                continue
              </button>
            )}
            <button type="button" onClick={handleEndRecordVoice}>
              end
            </button>
          </>
        )}
      </div>
    </div>
  );
};
