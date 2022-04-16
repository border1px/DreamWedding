
package com.likeyo.dreamwedding;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;
import ohos.ace.ability.LocalParticleAbility;
import ohos.agp.window.service.Window;
import ohos.distributedhardware.devicemanager.DeviceManager;

import com.likeyo.dreamwedding.manager.HPermission;
import com.likeyo.dreamwedding.manager.JSInterface;

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
     * @param type type
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
