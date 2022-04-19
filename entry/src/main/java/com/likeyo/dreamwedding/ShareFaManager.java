package com.likeyo.dreamwedding;

import com.huawei.hwshare.third.HwShareCallbackStub;
import com.huawei.hwshare.third.HwShareServiceProxy;
import ohos.aafwk.ability.IAbilityConnection;
import ohos.aafwk.content.Intent;
import ohos.aafwk.content.Operation;
import ohos.app.Context;
import ohos.bundle.ElementName;
import ohos.eventhandler.EventHandler;
import ohos.eventhandler.EventRunner;
import ohos.interwork.utils.PacMapEx;
import ohos.rpc.IRemoteObject;
import ohos.rpc.RemoteException;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class ShareFaManager {
    private static final HiLogLabel LABEL_LOG = new HiLogLabel(3, 0xD000F00, "ShareFa");

    private static final String LOG_FORMAT = "%{public}s: %{public}s";

    public static final String HM_FA_ICON = "ohos_fa_icon";

    public static final String HM_FA_NAME = "ohos_fa_name";

    public static final String HM_ABILITY_NAME = "ohos_ability_name";

    public static final String HM_BUNDLE_NAME = "ohos_bundle_name";

    public static final String SHARING_FA_TYPE = "sharing_fa_type";

    public static final String SHARING_THUMB_DATA = "sharing_fa_thumb_data";

    public static final String SHARING_CONTENT_INFO = "sharing_fa_content_info";

    public static final String SHARING_EXTRA_INFO = "sharing_fa_extra_info";

    private static final String TAG = "ShareHmFaManager";

    private static final String SHARE_PKG_NAME = "com.huawei.android.instantshare";

    private static final String SHARE_ACTION = "com.huawei.instantshare.action.THIRD_SHARE";

    private static final long UNBIND_TIME = 20*1000L;

    private Context mContext;

    private String mAppId;

    private PacMapEx mSharePacMap;

    private static ShareFaManager sSingleInstance;

    private HwShareServiceProxy mShareService;

    private boolean mHasPermission = false;

    private EventHandler mHandler = new EventHandler(EventRunner.getMainEventRunner());

    private final IAbilityConnection mConnection = new IAbilityConnection() {
        @Override
        public void onAbilityConnectDone(ElementName elementName, IRemoteObject iRemoteObject, int i) {
            HiLog.error(LABEL_LOG, LOG_FORMAT, TAG, "onAbilityConnectDone success.");
            mHandler.postTask(()->{
                mShareService = new HwShareServiceProxy(iRemoteObject);
                try {
                    mShareService.startAuth(mAppId, mFaCallback);
                } catch (RemoteException e) {
                    HiLog.error(LABEL_LOG, LOG_FORMAT, TAG, "startAuth error.");
                }
            });
        }

        @Override
        public void onAbilityDisconnectDone(ElementName elementName, int i) {
            HiLog.info(LABEL_LOG, LOG_FORMAT, TAG, "onAbilityDisconnectDone.");
            mHandler.postTask(()->{
                mShareService = null;
                mHasPermission = false;
            });
        }
    };

    private Runnable mTask = () -> {
        if (mContext != null && mShareService != null) {
            mContext.disconnectAbility(mConnection);
            mHasPermission = false;
            mShareService = null;
        }
    };

    private final HwShareCallbackStub mFaCallback = new HwShareCallbackStub("HwShareCallbackStub") {
        @Override
        public void notifyState(int state) throws RemoteException {
            mHandler.postTask(()->{
                HiLog.info(LABEL_LOG, LOG_FORMAT, TAG, "notifyState: " + state);
                if (state == 0) {
                    mHasPermission = true;
                    if (mSharePacMap != null) {
                        shareFaInfo();
                    }
                }
            });
        }
    };

    /**
     * 单例模式获取ShareFaManager的实例对象
     *
     * @param context 程序Context
     * @return ShareFaManager实例对象
     */
    public static synchronized ShareFaManager getInstance(Context context) {
        if (sSingleInstance == null && context != null) {
            sSingleInstance = new ShareFaManager(context.getApplicationContext());
        }
        return sSingleInstance;
    }

    private ShareFaManager(Context context) {
        mContext = context;
    }

    private void shareFaInfo() {
        if (mShareService == null) {
            return;
        }
        if (mHasPermission) {
            HiLog.info(LABEL_LOG, LOG_FORMAT, TAG, "start shareFaInfo.");
            try {
                mShareService.shareFaInfo(mSharePacMap);
                mSharePacMap = null;
            } catch (RemoteException e) {
                HiLog.error(LABEL_LOG, LOG_FORMAT, TAG, "shareFaInfo error.");
            }
        }
        // 不使用时断开
        mHandler.postTask(mTask, UNBIND_TIME);
    }

    /**
     * 用于分享服务
     *
     * @param appId 开发者联盟网站创建原子化服务时生成的appid
     * @param pacMap 服务信息载体
     */
    public void shareFaInfo(String appId, PacMapEx pacMap) {
        if (mContext == null) {
            return;
        }
        mAppId = appId;
        mSharePacMap = pacMap;
        mHandler.removeTask(mTask);
        shareFaInfo();
        bindShareService();
    }

    private void bindShareService() {
        if (mShareService != null) {
            return;
        }
        HiLog.error(LABEL_LOG, LOG_FORMAT, TAG, "start bindShareService.");
        Intent intent = new Intent();
        Operation operation = new Intent.OperationBuilder()
                .withDeviceId("")
                .withBundleName(SHARE_PKG_NAME)
                .withAction(SHARE_ACTION)
                .withFlags(Intent.FLAG_NOT_OHOS_COMPONENT)
                .build();
        intent.setOperation(operation);
        mContext.connectAbility(intent, mConnection);
    }
}