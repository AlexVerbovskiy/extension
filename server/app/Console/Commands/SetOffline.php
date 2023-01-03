<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SetOffline extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:SetOffline';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to set users offline';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $date = date('Y-m-d H:i:s', time() - 120);
        DB::table('user_info')->where([
            ['updated_at', '<', $date],
            ['status', '=', 1]
        ])->update(['status' => 0]);
        return Command::SUCCESS;
    }
}
