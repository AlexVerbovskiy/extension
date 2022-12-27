<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        \App\Models\UserInfo::where('updated_at', '<', $date)->update(['status' => 0]);
        return Command::SUCCESS;
    }
}
