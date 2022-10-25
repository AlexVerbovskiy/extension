<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'userInfo';

    protected $primaryKey = 'id';

    protected $fillable = [
        'first_name',
        'last_name',
        'linkedin_id',
        'active',
    ];
}
