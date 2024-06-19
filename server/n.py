# arr=[0,1,0,3,12]
# z_list=[]
# n_list=[]
# for i in arr:
#     if i==0:
#         z_list.append(i)
#     else:
#         n_list.append(i)

# print(n_list+z_list) \
    
arr1=[1,2,3,4,5]
arr2=[1,2,3,6,7]
l=sorted(set(arr1) | set(arr2))  
print(l)