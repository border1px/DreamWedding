import ShapeImage from '../../common/engine/core/shapes/Image.js';
import device from '@system.device';
import prompt from '@system.prompt';
import Application from '../../common/engine/core/Application'
import { mainmenu, submenu } from '../../common/menu'
import { handleChangeItem, handleChangeBg, handleTriggerTabVisbile, handleTriggerTabHide, makeContainerName, changeItem, createItem, createElement, createBoy, createGirl, touchEventHandler, handleChoiceContainer, resizeTouchMove, handleClearAllSelected } from '../../common/mixins'

var JS_PATH = 'com.likeyo.dreamwedding.manager.JSInterface';
var BUNDLE_NAME = 'com.likeyo.dreamwedding.hmservice';
var ABILITY_NAME = 'com.likeyo.dreamwedding.MainAbility';

var timeoutID;
var intervalID;
var skipTime = 3;

export default {
  mixins: [handleChangeItem, handleChangeBg, handleTriggerTabVisbile, handleTriggerTabHide, makeContainerName, changeItem, createItem, createElement, createBoy, createGirl, touchEventHandler, handleChoiceContainer, resizeTouchMove, handleClearAllSelected],
  data: {
    _app: null,
    _hittedSprite: null,
    windowWidth: 0,
    windowHeight: 0,
    submenuIndex: -1,
    sheetVisible: true,
    animationShowSheet: null,
    animationHideSheet: null,
    mainmenu,
    submenu,
    deviceList: [],
    // 是否是游戏界面，不是游戏界面就是授权的界面
    isMaster:true,
    type_name: '',
    loading: false,

    // splash
    splashVisible: true,
    scene1Visible: true,
    scene2Visible: false,
    scene3Visible: false
  },
  onInit() {
    if(this.networkId == undefined || this.networkId == ''){
      this.isMaster = true;
    } else {
      this.isMaster = false;
    }

    timeoutID = setTimeout(() => {
      clearTimeout(timeoutID);
      this.splashVisible = false;
    }, 2000);
  },
  initBg() {
    // 初始化背景
    let ctx = this.$refs.canvas.getContext('2d')
    let client = this.$refs.canvas.getBoundingClientRect()
    var img = new Image();
    img.src = 'common/images/img/bg1.png';
    img.onload = function() {
      ctx.drawImage(img, 0, 0, client.width, client.height);
    }
  },
  onReady() {
    // splash
    var options = {duration: 800, easing: 'linear', fill: 'forwards'};
    var frames = [
      {transform: {translateX: '0'}},
      {transform: {translateX: '180'}}
    ];

    // 初始化背景
//    this.initBg()

    setTimeout(() => {
      let animation = this.$element('man').animate(frames, options);
      animation.play()
      animation.onfinish = () => {
        this.scene1Visible = false
        this.scene3Visible = true
      };

      // 初始化隐藏tab动画
      var optionsPromptList = { duration: 300, easing: 'friction', delay: 0, fill: 'forwards', iterations: 1 };
      var framesPromptHideList = [
        {transform: {translateY: '0'}},
        {transform: {translateY: '210'}}
      ];
      this.animationHideSheet = this.$element('tabs').animate(framesPromptHideList, optionsPromptList);

      // 启动主程序
      this._app = new Application(this.$refs.canvas)
      this._app.rootContainer.sprite.touchEvent = this.touchEventHandler.bind(this)
      this._app.start()
    }, 500)
    setTimeout(() => {this.scene2Visible = true}, 500)
  },
  onTouchStart(evt) {
    this._app.handleEvent(evt)
  },
  onTouchMove(evt) {
    this._app.handleEvent(evt)
  },
  onTouchEnd(evt) {
    this._app.handleEvent(evt)
  },
  startHWShare() {
    this.javaInterface = createLocalParticleAbility(JS_PATH);
    this.javaInterface.startHWShare(result => {

    })
  },
  /**
   * 启动FA
  */
  async startFA() {
    var that = this;
    this.javaInterface = createLocalParticleAbility(JS_PATH);
    // 使用calculateAsync异步返回，callback返回结果。
    // getNetWorkIdAsync方法名字要和JAVA中JSInterface类的getNetWorkIdAsync方法名字一致
    this.javaInterface.getNetWorkIdAsync(result => {
      // 不能使用this.localNetWorkId访问data下的字段，先把this赋值给that
      that.localNetWorkId = result;
      this.showDeviceList();
    })
  },
  /**
   * 设备列表
  */
  async showDeviceList() {
    // 获取所有在线设备列表
    // @ts-ignore
    var ret = await FeatureAbility.getDeviceList(0);
    if (ret.code === 0) {
      this.deviceList = [];
      for (var i = 0; i < ret.data.length; i++) {
        // 将结果集存放在数组中
        this.deviceList.push({
          deviceName: ret.data[i].deviceName,
          networkId: ret.data[i].networkId
        });
      }
    }

    // 在对话框中显示列表
    if (this.deviceList.length > 0) {
      this.$element('showDialog').show();
    } else {
      prompt.showToast({
        message: '附近没有搜索到可授权设备',
        duration: 2000,
      });
    }
  },
  /**
   * 打开远程设备Ability
  */
  async selectDevice(networkId) {
    this.$element('showDialog').close();
    let actionData = {
      networkId: this.localNetWorkId,
    };

    let target = {
      bundleName: BUNDLE_NAME,
      abilityName: ABILITY_NAME,
      networkId: networkId,
      data: actionData
    };

    // 关闭tab
    this.handleTriggerTabHide();

    let result = await FeatureAbility.startAbility(target);
    let ret = JSON.parse(result);
    if (ret.code == 0) {
      prompt.showToast({
        message: '请求权限中...',
        duration: 1000,
      });
    }

    //    this.animationHideSheet.play()
  },
  doMaster(type, name) {
    // JS调用Java的方法
    let type_name = `${type}:${name}`
    this.javaInterface = createLocalParticleAbility(JS_PATH);
    this.javaInterface.isAllowTriggerAsync(type_name, result => {
      // 远程拉起FA
      this.startRemoteAbility(type_name);
    });

  },
  startRemoteAbility(type_name){
    let actionData = {
      type_name: type_name,
    };

    let target = {
      bundleName: BUNDLE_NAME,
      abilityName: ABILITY_NAME,
      // 这个networkId是手机端发起FA时发送过来的哦，在data中没有指定，但可以这么调用传递过来的字段
      networkId: this.networkId,
      data: actionData
    };

    FeatureAbility.startAbility(target);
  },
  /**
   * launchType设置为singleton模式，MainAbility如果已经启动再次调用FeatureAbility.startAbility()方法，那么这个onNewRequest会被调用哦
   * 但是有种情况也会调用，就是按下Home键，再次点击桌面图标，这个方法也会调用，所以使用type=0控制不做任何处理
   */
  onNewRequest() {
    let type = this.type_name.split(':')[0]
    let name = this.type_name.split(':')[1]

    if (type === 'bg') {
      this.handleChangeBg(name)
    } else {
      this.createItem(name)
    }
  },
  handleCamera() {
    //    prompt.showToast({
    //      message: '正在保存图片...',
    //      duration: 3000
    //    })

    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
}
