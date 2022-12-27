<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    public function save(Request $request)
    {
        //parse data from json
        $data = json_decode($request->getContent(), true);

        try {
            //find and update old or create new userInfo model
            $userInfo = \App\Models\UserInfo::firstOrNew(['linkedin_id' => $data['id']]);
            $userInfo->first_name = $data['firstName'];
            $userInfo->last_name = $data['lastName'];
            $userInfo->urn = $data['urn'];
            $userInfo->active = $data['active'];
            $userInfo->image = $data['image'];
            $userInfo->status = true;
            $userInfo->image_id = $data['image_id'];
            $userInfo->save();
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return 0;
        }

        return 1;
    }

    public function getAllUsers(Request $request, $id = "")
    {
        try {
            $data = DB::table('user_info')
                ->select(DB::raw('first_name, last_name, active, image, urn, image_id, status, linkedin_id,
                TIMESTAMPDIFF(SECOND, NOW(), updated_at) as last_active'))
                ->where([['active', '=', 1], ['linkedin_id', '!=', $id]])
                ->orderBy('status', 'DESC')
                ->orderBy('updated_at', 'DESC')
                ->get();

            return json_encode($data);
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return json_encode([]);
        }
    }

    public function setOffline(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $userInfo = \App\Models\UserInfo::where('linkedin_id', "=", $id)->firstOrFail();
        $userInfo->status = false;
        $userInfo->save();
        return json_encode(1);
    }

    public function updateOnline(Request $request, $id = "")
    {
        try {
            \App\Models\UserInfo::where(['linkedin_id' => $id])->update(['status' => 1]);
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return json_encode([]);
        }
    }

    public function updateUserPhoto(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        try {
            $image_id = explode('?', $data['url'])[0];
            $image_id = explode('/', $image_id);
            $image_id = end($image_id);
            \App\Models\UserInfo::where(['urn' => $data['id']])->update(['image' => $data['url'], 'image_id' => $image_id]);
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return json_encode(0);
        }
        return json_encode(1);
    }
}
