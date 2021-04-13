import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';

const TestUser = () => {
  return (
    <div className="user-item">
      <h1 className="main-title">用户协议</h1>
      <div className="part-one">
        <p className="title">一、【协议的范围】</p>
        <p className="word-title">1.1本协议是用户（以下可称为“您”）与腾讯之间关于下载、安装、使用、登录本软件，以及使用本服务所订立的协议。</p>
        <p className="word-title">1.2 本协议被视为《腾讯服务协议》及《腾讯QQ软件许可及服务协议》、《QQ号码规则》的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。本协议内容同时包括腾讯可能不断发布的关于本服务的相 关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。专项规则一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。</p>
      </div>
      <div className="part-two">
        <p className="title">二、【关于本服务】</p>
        <p className="word-title">2.1 相关定义</p>
        <p className="word-title">（1）腾讯企点软件：指由腾讯开发、运营并享有独立知识产权的，专为市场营销、在线客服、销售管理等需求提供内容制作、内容分发、用户数据分析、用户互动等服务的企业服务软件，以下可简称为“企点”。</p>
        <p className="word-title">（2）单位用户：指按照腾讯指定方式、渠道获得本软件使用权，并对相应的企点帐号（以下可简称为“帐号”，包括单位用户帐号和个人用户帐号）有管理权限的用户。一个企点帐号下仅有一个单位用户帐号。</p>
        <p className="word-title">（3）个人用户：指经过单位用户授权使用本软件的普通用户。单位用户仅可以将本软件的使用权转授权给属于本单位的工作人员或其他协助运营企点账户的人员进行使用，这里称为个人用户。</p>
        <p className="word-title">2.2 本服务内容是指，通过本软件可以对腾讯指定产品进行相关操作（例如在本软件中编辑、整理QQ公众号、微信公众号的文字、图片等消息内容并对外发送）的企业服 务（简称“本服务”）。具体产品以腾讯实际指定的为准。用户在使用本服务进行相关操作时，需要遵守相关产品的服务规则、专项规则等（包括但不限于《QQ公众平台服务协议》、《微信公众平台服务协议》等）。</p>
      </div>
      <div className="user-know" >
        <Link to='/testLogin' className="link">我已知晓</Link>
      </div>
    </div>
  )
}

export default TestUser;