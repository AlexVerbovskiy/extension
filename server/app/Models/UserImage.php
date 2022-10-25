<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserImage extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'userImage';

    protected $primaryKey = 'id';

    protected $fillable = [
        'url',
        'linkedin_id',
    ];
}
