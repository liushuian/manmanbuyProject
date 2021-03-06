$(function () {
    //打开页面时马上以默认的商店和地区id渲染页面
    queryGoods();

    $('.shop').on('tap', function () {
        // if ($(this).find('i').hasClass('fa-caret-down')){
        //     var id = $(this).data('id');
        //     //修改箭头指向，展开下拉选择框
        //     $(this).find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
        //     $.ajax({
        //         url: 'http://localhost:9090/api/getgsshop',
        //         dataType: 'json',
        //         success: function (data) {
        //             for (var i=0; i<data.result.length; i++){
        //                 data.result[i].id = id;
        //             }
        //             console.log(data);
        //             var html = template('selectList', {data: data.result});
        //             console.log(html);
        //             $('.select').html(html);
        //             $('.select').show();
        //
        //             // 为下拉列表注册点击事件
        //             $('.select').on('tap', 'li', function () {
        //                 console.log($(this).data('id'));
        //                 id = $(this).data('id');
        //                 var shopName = $(this).data('shopname');
        //                 var html = shopName + '<i class="fa fa-caret-down" aria-hidden="true">';
        //                 $('.shop').html(html);
        //                 $('.shop').data('id', id);
        //                 $('.select').hide();
        //             })
        //         }
        //     })
        // }else {
        //     $(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
        //     $('.select').hide();
        // }

        typeSelect(".shop", "http://localhost:9090/api/getgsshop", 'shop-selectList', '.shop-select');
    });

    $('.area').on('tap', function () {
        typeSelect('.area', 'http://localhost:9090/api/getgsshoparea', 'area-selectList', '.area-select');
    });

    // className:点击选择的类名
    // url：请求接口地址
    // templateID：模板id
    // templateClass：放置下拉框的类名
    function typeSelect(className, url, templateID, templateClass) {
        if ($(className).find('i').hasClass('fa-caret-down')){
            var id = $(className).data('id');
            //修改箭头指向，展开下拉选择框
            $(className).find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
            //关闭其他兄弟下拉框
            $(className).siblings('li').find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
            $('.display').hide();

            $.ajax({
                url: url,
                dataType: 'json',
                success: function (data) {
                    for (var i=0; i<data.result.length; i++){
                        data.result[i].id = id;
                    }
                    var html = template(templateID, {data: data.result});
                    $(templateClass).html(html);
                    $(templateClass).show();

                    // 为下拉列表注册点击事件
                    $(templateClass).on('tap', 'li', function () {
                        id = $(this).data('id');
                        var myName = $(this).data('name');
                        if (className == '.area'){
                            myName = myName.substring(0, 2);
                        }
                        var html = myName + '<i class="fa fa-caret-down" aria-hidden="true">';
                        $(className).html(html);
                        $(className).data('id', id);
                        $(templateClass).hide();
                        queryGoods();
                    })
                }
            })
        }else {
            $(className).find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
            $(templateClass).hide();
        }
    }

    function queryGoods() {
        var shopId = $('.shop').data('id');
        var areaId = $('.area').data('id');

        $.ajax({
            url: 'http://localhost:9090/api/getgsproduct',
            dataType: 'json',
            data: {shopid: shopId, areaid: areaId},
            success: function (data) {
                var html = template('goods', {data: data.result});
                $('.goods').html(html);
            }
        })
    }
});