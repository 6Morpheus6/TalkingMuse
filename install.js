module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          // fixed duplicated "git clone"
          "git clone https://huggingface.co/spaces/sk61tc4j53obiq/musetalk-full app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch",
          // pin a compatible mmcv version (mmdet requires mmcv < 2.2.0)
          "uv pip install \"mmcv>=2.0.0rc4,<2.2.0\"",
          "uv pip install -r requirements.txt",
          "uv pip install -U \"huggingface_hub[cli]\" ",
          "uv pip install gdown",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "set HF_ENDPOINT=https://hf-mirror.com",
          "huggingface-cli download TMElyralab/MuseTalk --local-dir models --include \"musetalk/musetalk.json\" \"musetalk/pytorch_model.bin\"",
          "huggingface-cli download TMElyralab/MuseTalk --local-dir models --include \"musetalkV15/musetalk.json\" \"musetalkV15/unet.pth\"",
          "huggingface-cli download stabilityai/sd-vae-ft-mse --local-dir models/sd-vae --include \"config.json\" \"diffusion_pytorch_model.safetensors\"",,
          "huggingface-cli download openai/whisper-tiny --local-dir models/whisper --include \"config.json\" \"pytorch_model.bin\" \"preprocessor_config.json\"",
          "huggingface-cli download yzd-v/DWPose --local-dir models/dwpose --include \"dw-ll_ucoco_384.pth\"",
          "huggingface-cli download ByteDance/LatentSync --local-dir models/syncnet --include \"latentsync_syncnet.pt\"",
          "gdown --id 154JgKpzCPW82qINcVieuPH3fZ2e0P812 -O models/face-parse-bisent/79999_iter.pth",
          "curl -L https://download.pytorch.org/models/resnet18-5c106cde.pth -o models/face-parse-bisent/resnet18-5c106cde.pth"
        ]
      }
    }
  ]
}