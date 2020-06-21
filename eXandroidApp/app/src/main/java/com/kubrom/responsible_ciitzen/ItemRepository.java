package com.kubrom.responsible_ciitzen;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ItemRepository {

    @POST("post")
    Call<UploadInfo> createItem(@Body UploadInfo uploadInfo);
}
