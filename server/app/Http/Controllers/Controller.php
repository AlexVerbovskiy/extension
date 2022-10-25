<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

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
            $userInfo->active = true;
            $userInfo->save();
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return 0;
        }

        return 1;
    }

    public function getAllIds(Request $request, $id = "")
    {
        file_put_contents("temp.txt", $id);
        try {
            $data = \App\Models\UserInfo::where([['active', '=', 1], ['linkedin_id', '!=', $id]])->pluck('linkedin_id')->toArray();
            return json_encode($data);
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return json_encode([]);
        }
    }

    public function deactivate(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $userInfo = \App\Models\UserInfo::where('linkedin_id', '=', $data['id'])->firstOrFail();
        $userInfo->active = false;
        $userInfo->save();
        return 1;
    }

    public function getCountUsers(Request $request, $id = "")
    {
        $count = \App\Models\UserInfo::where([['active', '=', 1], ['linkedin_id', '!=', $id]])->count();
        return json_encode($count);
    }
}
