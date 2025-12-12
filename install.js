module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/sk61tc4j53obiq/musetalk-full app",
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install wheel",
          "uv pip install ../wheels/mmcv-2.1.0-cp310-cp310-win_amd64.whl",
          "uv pip install mmpose mmdet --no-build-isolation",
          "uv pip install -r ../requirements.txt"
        ]
      }
    },
    {
      when: "{{platform === 'linux'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install wheel",
          "uv pip install mmcv==2.1.0 mmpose mmdet --no-build-isolation",
          "uv pip install -r ../requirements.txt"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true,
          // triton: true,
          // sageattention: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          'hf download TMElyralab/MuseTalk --local-dir=models --include="musetalk/musetalk.json" --include="musetalkV15/musetalk.json" --include="musetalk/pytorch_model.bin" --include="musetalkV15/unet.pth"',
          'hf download stabilityai/sd-vae-ft-mse --local-dir=models/sd-vae --include="config.json" --include="diffusion_pytorch_model.safetensors"',
          'hf download openai/whisper-tiny --local-dir=models/whisper --include="config.json" --include="pytorch_model.bin" --include="preprocessor_config.json"',
          'hf download yzd-v/DWPose --local-dir=models/dwpose --include="dw-ll_ucoco_384.pth"',
          'hf download ByteDance/LatentSync --local-dir=models/syncnet --include="latentsync_syncnet.pt"',
          "gdown --id 154JgKpzCPW82qINcVieuPH3fZ2e0P812 -O models/face-parse-bisent/79999_iter.pth",
          "curl -L https://download.pytorch.org/models/resnet18-5c106cde.pth -o models/face-parse-bisent/resnet18-5c106cde.pth"
        ]
      }
    }
  ]
}