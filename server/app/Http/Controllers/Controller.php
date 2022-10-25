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

            //saving user images
            foreach ($data['images'] as $image) {
                $image = \App\Models\UserImage::firstOrNew(
                    ['url' => $image["url"]],
                    ['linkedin_id' => $data['id']]
                );
                $image->save();
            }
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return 0;
        }

        return 1;
    }

    public function getAllImages()
    {
        try {
            $data = \App\Models\UserInfo::where('active', '=', 1)
                ->join('userImage', 'userInfo.linkedin_id', '=', 'userImage.linkedin_id')
                ->pluck('userImage.url')->toArray();

            return json_encode($data);
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return json_encode([]);
        }
    }

    /* 
    public function getAllImages(Request $request, $id)
    {
        try {
            $data = \App\Models\UserInfo::where([['active', '=', 1], ['linkedin_id', '!=', $id]])
                ->join('userImage', 'userInfo.linkedin_id', '=', 'userImage.linkedin_id')
                ->pluck('userImage.url')->toArray();

            return json_encode($data);
        } catch (\Exception $e) {
            file_put_contents("log.txt", $e->getMessage());
            return json_encode([]);
        }
    }
    */

    public function deactivate(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $userInfo = \App\Models\UserInfo::where('linkedin_id', '=', $data['id'])->firstOrFail();
        $userInfo->active = false;
        $userInfo->save();
        return 1;
    }

    public function getCountUsers()
    {
        $count = \App\Models\UserInfo::where('active', '=', 1)->join('userImage', 'userInfo.linkedin_id', '=', 'userImage.linkedin_id')->count();
        return json_encode($count);
    }
}
