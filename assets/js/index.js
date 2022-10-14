$(function () {
    // 调用获取用户信息的函数
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.跳转到登录页
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})
// 定义获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // Headers: {
        //     Authorization: localStorage.getItem('token') | ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用函数渲染用户头像
            renderAvatar(res.data)
        },
        // // 设置让你不登录无法直接访问index主页
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 跳转回登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 定义渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}
