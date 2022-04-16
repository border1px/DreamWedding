
package com.likeyo.dreamwedding.manager;

import com.likeyo.dreamwedding.MainAbility;
import ohos.ace.ability.LocalParticleAbility;

public class JSInterface implements LocalParticleAbility {
    private final MainAbility mainAbility;

    public JSInterface(final MainAbility ability) {
        this.mainAbility = ability;
    }
    public void getNetWorkIdAsync(final Callback callback) {
        mainAbility.setCallback(callback);
        mainAbility.requestPermissionAndGetNetWorkId();
    }

    /**
     * JavaScript asynchronous execution invokes the Java method.
     *
     * @param code     Agree or not
     * @param callback Used for JS callback.
     */
    public void isAllowTriggerAsync(String type_name, final Callback callback) {
        mainAbility.setCallback(callback);
        mainAbility.isAllowTriggerAsync(type_name);
    }

    /**
     * get BundleName
     *
     * @return bundleName
     */
    public String getBundleName(){
        String bundleName=mainAbility.getBundleName();
        return bundleName;
    }

    /**
     * get AbilityName
     *
     * @return name
     */
    public String getAbilityName(){
        String mainAbilityName=mainAbility.getClass().getName();
        return mainAbilityName;
    }
}