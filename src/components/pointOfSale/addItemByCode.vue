<template>
  <p v-if="code">
    Código Lido: {{ code }}
    <q-btn
      icon="mdi-content-copy"
      @click="copyCode"
      size="md"
      dense
      color="blue-9"
    />
  </p>

  <div class="video-container" v-show="cameraStatus" id="reader">
    <video id="video" autoplay playsinline></video>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import Quagga from 'quagga';
import { copyToClipboard, useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const code = ref('');
    const cameraStatus = ref(false);
    const q$ = useQuasar();
    let videoElement = null;
    let canvasElement = null;

    onMounted(() => {
      videoElement = document.getElementById('video');
      canvasElement = document.getElementById('canvas');
      initReader();
    });

    const initReader = () => {
      cameraStatus.value = true;
      const constraints = {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        facingMode: 'environment',
        advanced: [{ zoom: 3 }],
      };

      navigator.mediaDevices.getUserMedia({ video: constraints })
        .then((stream) => {
          videoElement.srcObject = stream;
          videoElement.onloadedmetadata = () => {
            videoElement.play();
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            startQuagga();
          };
        })
        .catch((err) => {
          console.error('Error accessing camera:', err);
        });
    };

    const startQuagga = () => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: canvasElement,
          },
          decoder: {
            readers: ['ean_reader'],
          },
          locate: true,
          locator: {
            patchSize: 'medium',
            halfSample: true,
          },
          debug: {
            drawBoundingBox: true,
            showFrequency: false,
            drawScanline: true,
            showPattern: false,
          },
        },
        (err) => {
          if (err) {
            console.error('Error initializing Quagga:', err);
            return;
          }
          console.log('Quagga initialization finished. Ready to start');
          Quagga.start();
          Quagga.onDetected(onDetected);
        }
      );

      Quagga.onProcessed((result) => {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              drawingCanvas.getAttribute('width'),
              drawingCanvas.getAttribute('height')
            );
            result.boxes.forEach((box) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2,
              });
            });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: '#00F',
              lineWidth: 2,
            });
          }

          if (result.codeResult && result.codeResult.code) {
            console.log('Code detected: ' + result.codeResult.code);
          }
        }
      });
    };

    const stopReader = () => {
      cameraStatus.value = false;
      Quagga.stop();
    };

    const onDetected = (data) => {
      code.value = data.codeResult.code;
      stopReader();
      console.log(data);
    };

    const copyCode = () => {
      copyToClipboard(code.value)
        .then(() => {
          q$.notify({
            message: 'Código de barras copiado com sucesso!',
            type: 'positive',
          });
        })
        .catch(() => {
          q$.notify({
            message: 'Erro ao copiar Código de barras!',
            type: 'negative',
          });
        });
    };

    return {
      initReader,
      stopReader,
      cameraStatus,
      code,
      copyCode,
    };
  },
});
</script>

<style scoped>
.reader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
}

.video-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
}

#video {
  width: 100vw;
  height: auto;
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
}
</style>
