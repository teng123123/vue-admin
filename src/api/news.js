import service from "@/utils/request";
/**
 * 列表
 */

/**
 * 新增
 */

/**
 * 编辑
 */
export function EditCategory(data){
  return service.request({
    method:"post",
    url:"/news/editCategory/",
    data
  })
}
/**
 * 删除
 */
export function DeleteCategory(data){
  return service.request({
    method:"post",
    url:"/news/deleteCategory/",
    data
  })
}
/**
 * 添加一级分类
 */
export function AddFirstCategory(data){
  return service.request({
    method:"post",
    url:"/news/addFirstCategory/",
    data
  })
}
/**
 * 添加一级获取
 */
export function GetCategory(data){
  return service.request({
    method:"post",
    url:"/news/getCategory/",
    data
  })
}