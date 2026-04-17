<template>
    <view class="change-avatar">
        <uni-file-picker ref="uploadElement" :auto-upload="false" @select="loadFile" />

        <PopWrapper v-model:pop-show="popShow" @click.stop @tap.stop>
            <view class="change-avatar__get" :style="{ height: canvasHeight + 'px' }">
                <canvas mode="aspectFill" canvas-id="imgCanvas" id="imgCanvas" class="change-avatar__show-img"
                    :style="{ height: canvasHeight + 'px' }" :width="300" :height="canvasHeight"></canvas>
                <image :src="imagePath" mode="scaleToFill" class="change-avatar__preview"
                    :style="{ width: '300px', height: canvasHeight + 'px' }" />
                <canvas :style="{ width: '300px', height: canvasHeight + 'px' }" :width="300" :height="canvasHeight"
                    canvas-id="firstCanvas" id="firstCanvas" @touchmove="touchmove" @error="canvasIdErrorCallback"
                    @touchstart="touchstart" class="change-avatar__get-canvas" @touchend="touchend"></canvas>
            </view>
            <!-- hidden crop canvas for 200x200 output -->
            <canvas :width="200" :height="200"
                style="width: 200px; height: 200px; position: fixed; left: 0; top: -1000px;" canvas-id="cropCanvas"
                id="cropCanvas"></canvas>
            <button class="change-avatar__button" @click="upload">上传文件</button>
        </PopWrapper>
        <SCButton type="button" size="26rpx" @click="changeAvatar" class="change-email__button">修改头像</SCButton>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref, onMounted, computed } from 'vue';
import PopWrapper from "@/components/base/PopWrapper/index.vue"
import { type UserChange } from '../icon/SettingComponent/type';
import SCButton from '@/components/common/SCButton/index.vue';

const props = defineProps<{ modelValue: UserChange }>();
const emit = defineEmits(['update:modelValue', 'submit']);

const formData = computed({
    set(newValue) {
        emit('update:modelValue', newValue)
    },
    get() {
        return props.modelValue
    }
});

const popShow = ref(false);

const size = ref(1); // 以300为基准
const canvasWidth = 300;
const ratio = ref(1);
const canvasHeight = computed(() => {
    return canvasWidth / ratio.value;
});
const ctx = ref<any>(null);
const imgctx = ref<any>(null);
const cropCtx = ref<any>(null);
const imagePath = ref('');
const croppedFile = ref<File | null>(null);
onMounted(() => {
    ctx.value = uni.createCanvasContext('firstCanvas');
    cropCtx.value = uni.createCanvasContext('cropCanvas');
    imgctx.value = uni.createCanvasContext('imgCanvas');
});

const loadFile = async (e) => {
    popShow.value = true;
    console.log('load file', popShow.value);
    const path = e.tempFilePaths[0]; // �� e.tempFiles[0].path
    imagePath.value = path;

    await new Promise((resolve) => {
        uni.getImageInfo({
            src: path,
            success: (info) => {
                ratio.value = info.width / info.height;
                size.value = info.width / canvasWidth;
                resolve(ratio.value);
                imgctx.value.clearRect(0, 0, canvasWidth, canvasHeight.value);
                imgctx.value.drawImage(path, 0, 0, canvasWidth, canvasHeight.value);
                console.log('111', canvasHeight.value)
                imgctx.value.draw(false, () => {
                    // use tempFilePath directly (more stable than blob:)
                    uni.canvasToTempFilePath(
                        {
                            canvasId: 'imgCanvas',
                            width: 300,
                            height: canvasHeight.value,
                            fileType: 'png',
                            quality: 1,
                            success: (res) => {
                                imagePath.value = res.tempFilePath;
                                // console.log('resized file path', imagePath.value);
                            },
                            fail: (err) => {
                                console.error('canvasToTempFilePath failed', err);
                            },
                        },
                        null
                    );
                });
                touchend(e)
            },
            fail: (err) => {
                console.error('getImageInfo failed', err);
            },
        });
    });
};

const touchmove = (e) => {
    const x = e.changedTouches[0].x;
    const y = e.changedTouches[0].y;
    ctx.value.setStrokeStyle('red');
    ctx.value.rect(x, y, 200, 200);
    ctx.value.stroke();
    ctx.value.draw();
}
const touchstart = (e) => {
    const x = e.changedTouches[0].x;
    const y = e.changedTouches[0].y;
    ctx.value.setStrokeStyle('red');
    ctx.value.rect(x, y, 200, 200);
    ctx.value.stroke();
    ctx.value.draw();
}

const touchend = (e) => {
    if (!imagePath.value || !cropCtx.value) return;
    const x = e.changedTouches?.[0]?.x * size.value || 0;
    const y = e.changedTouches?.[0]?.y * size.value || 0;
    console.log(x, y);

    // crop 200x200 from the image using (x, y) as top-left
    cropCtx.value.clearRect(0, 0, 200, 200);

    cropCtx.value.drawImage(imagePath.value, x, y, 200 * size.value, 200 * size.value, 0, 0, 200, 200);

    // 等待加载完毕
    cropCtx.value.draw(false, () => {
        // export to temp file (H5) -> Blob -> File
        uni.canvasToTempFilePath(
            {
                canvasId: 'cropCanvas',
                width: 200,
                height: 200,
                fileType: 'png',
                quality: 1,
                success: async (res) => {
                    const blob = await fetch(res.tempFilePath).then((r) => r.blob());
                    const file = new File([blob], `avatar_${Date.now()}.png`, { type: 'image/png' });
                    croppedFile.value = file;
                    // console.log('cropped file', file);
                },
                fail: (err) => {
                    console.error('canvasToTempFilePath failed', err);
                },
            },
            null
        );
    });
}

async function upload() {
    if (!croppedFile.value) return;
    // console.log('upload file', croppedFile.value);
    const fileUri = URL.createObjectURL(croppedFile.value);
    const uploadResult = await new Promise<any>((resolve, reject) => {
        uni.uploadFile({
            url: `${import.meta.env.VITE_API_BASE}/upload-image-file`, // 手动拼接路径
            name: 'image',
            files: [{ name: 'image', uri: fileUri }], // 使用 uri 替代直接传入 File 对象
            formData: { type: 'multipart/form-data' },
            success: (res) => {
                uni.showToast({
                    title: 'upload success',
                    icon: 'success',
                    mask: true
                })
                resolve(JSON.parse(res.data));
            },
            fail: (err) => {
                console.error('upload failed', err);
                uni.showToast({
                    title: 'upload error',
                    icon: 'error',
                    mask: true
                })
                reject(err);
            }
        })
    })
    popShow.value = false
    imgctx.value.clearRect(0, 0, canvasWidth, canvasHeight.value)
    formData.value.avatar_url = uploadResult.filename;
    console.log('uploadResult', uploadResult);
    return uploadResult;
}

const canvasIdErrorCallback = (e) => {
    console.error(e.detail.errMsg)

}

function changeAvatar() {
    emit('submit')
}

</script>

<style lang="scss" scoped>
.change-avatar {
    .change-avatar__preview {
        width: 300px;
        height: 300px;
        display: block;
        margin-bottom: 8px;
        z-index: 2;
    }

    .change-avatar__get {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;

        .change-avatar__show-img {
            position: absolute;
            width: 300px;
            z-index: 1;
            display: none;
        }

        &-canvas {
            position: absolute;
            width: 300px;
            height: 200px;
            z-index: 3;
        }

    }

    &__button {
        position: fixed;
        bottom: -80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 200;
    }
}
</style>
