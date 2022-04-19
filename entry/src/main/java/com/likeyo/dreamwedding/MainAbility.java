
package com.likeyo.dreamwedding;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;
import ohos.ace.ability.LocalParticleAbility;
import ohos.agp.window.service.Window;
import ohos.distributedhardware.devicemanager.DeviceManager;

import com.likeyo.dreamwedding.manager.HPermission;
import com.likeyo.dreamwedding.manager.JSInterface;
import ohos.global.resource.NotExistException;
import ohos.interwork.utils.PacMapEx;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class MainAbility extends AceAbility {
    private HPermission permission;
    private JSInterface jsInterface;
    private LocalParticleAbility.Callback callback;

    @Override
    public void onStart(final Intent intent) {
        Window window = getWindow();
        window.setStatusBarColor(0xFFF8EADD);

        super.onStart(intent);
        jsInterface = new JSInterface(this);
        jsInterface.register(this);

    }

    @Override
    public void onStop() {
        super.onStop();
        jsInterface.deregister(this);
    }

    public void startHWShare() {
        byte[] bytes;
        InputStream inputStream = null;
        try {
            inputStream = getContext().getResourceManager().getResource(ResourceTable.Media_show);
            bytes = readInputStream(inputStream);
            PacMapEx pacMap = new PacMapEx();
            pacMap.putObjectValue(ShareFaManager.SHARING_FA_TYPE, 0);  //分享的服务类型
            pacMap.putObjectValue(ShareFaManager.HM_BUNDLE_NAME, "com.likeyo.dreamwedding.hmservice");
            pacMap.putObjectValue(ShareFaManager.SHARING_EXTRA_INFO, "SHARING_EXTRA_INFO");  //携带的额外信息，可传递到被拉起的服务界面
            pacMap.putObjectValue(ShareFaManager.HM_ABILITY_NAME, "com.likeyo.dreamwedding.MainAbility");  //分享的服务的Ability类名
            pacMap.putObjectValue(ShareFaManager.SHARING_CONTENT_INFO, "以爱之名，以余生为期");  //卡片展示的服务介绍信息
            pacMap.putObjectValue(ShareFaManager.SHARING_THUMB_DATA, bytes);  //卡片展示服务介绍图片//
            inputStream = getContext().getResourceManager().getResource(ResourceTable.Media_icon);
            bytes = readInputStream(inputStream);
            pacMap.putObjectValue(ShareFaManager.HM_FA_ICON, bytes);  //服务图标,如果不传递此参数，取分享方默认服务图标
            pacMap.putObjectValue(ShareFaManager.HM_FA_NAME, "梦中的婚礼");   //卡片展示的服务名称
            ShareFaManager.getInstance(this).shareFaInfo("867333291311639360", pacMap);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (NotExistException e) {
            e.printStackTrace();
        }

    }

    private byte[] readInputStream(InputStream inputStream) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length = -1;
        try {
            while ((length = inputStream.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
            baos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] data = baos.toByteArray();
        try {
            inputStream.close();
            baos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    /**
     * Request permission and obtain the local NetWorkId.
     */
    public void requestPermissionAndGetNetWorkId() {
        permission = new HPermission();
        permission.requestPermissions(this, this::getNetWorkId);
    }

    /**
     * Obtain the local NetWorkId and return it to the JS.
     * The NetWorkId needs to be obtained through .
     * the DeviceManager.DeviceManagerCallback callback.
     */
    private void getNetWorkId() {
        DeviceManager.createInstance(new DeviceManager.DeviceManagerCallback() {
            @Override
            public void onGet(final DeviceManager deviceManager) {
                String networkId = deviceManager.getLocalDeviceInfo()
                        .getNetworkId();
                jsCallBack(networkId);
            }

            @Override
            public void onDied() {
            }
        });
    }

    /**
     * Asynchronous callback JS.
     *
     * @param networkId device networkId
     */
    private void jsCallBack(final String networkId) {
        if (callback != null) {
            new Thread(() -> callback.reply(networkId)).start();
        }
    }

    /**
     * Permissions.
     *
     * @param requestCode requestCode
     * @param permissions permissions
     * @param grantResults grantResults
     */
    @Override
    public void onRequestPermissionsFromUserResult(
            final int requestCode, final String[] permissions,
            final int[] grantResults) {
        if (permission != null) {
            permission.onRequestPermissionsFromUserResult(
                    requestCode, grantResults);
        }
    }

    /**
     * start Remote Ability.
     *
     * @param type_name
     */
    public void isAllowTriggerAsync(String type_name) {
        permission = new HPermission();
        permission.requestPermissions(this, () -> {
            if (callback != null) {
                new Thread(() -> callback.reply(type_name)).start();
            }
        });
    }

    /**
     * Setting the Asynchronous JS Callback Interface.
     *
     * @param back Callback interface.
     */
    public void setCallback(final LocalParticleAbility.Callback back) {
        this.callback = back;
    }
}

