use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Transfer};
use solana_program::{
    account_info::AccountInfo, msg, program::invoke, pubkey::Pubkey, system_instruction,
};

declare_id!("AECpbyv5BG7f7Ez9A3ZfKtGQUwbaeGPJng4tNDpKcwuY");

#[program]
pub mod native_transfer {

    use super::*;

    pub fn transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let system_program = &mut ctx.accounts.system_program;
        let sender = &mut ctx.accounts.sender.to_account_info();
        let receiver = &mut ctx.accounts.receiver;

        let balance = receiver.lamports();

        if (amount + 100000) > balance {
            msg!(
                "Invalid bet {:?} {:?}",
                (amount * 1.1 as u64) + 100000,
                balance
            ); //0.0001 sol
            return Err(error!(ErrorCode::Unauthorized));
        }

        msg!(
            "Sending {:?} from {:?} to {:?}",
            amount,
            sender.key,
            receiver.key
        );

        invoke(
            &system_instruction::transfer(sender.key, receiver.key, amount),
            &[
                sender.clone(),
                receiver.clone(),
                system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn transfer_checked(
        ctx: Context<SolTransfer>,
        amount: u64,
        needed_amount: u64,
    ) -> Result<()> {
        let system_program = &mut ctx.accounts.system_program;
        let sender = &mut ctx.accounts.sender.to_account_info();
        let receiver = &mut ctx.accounts.receiver;

        let balance = receiver.lamports();

        if needed_amount > balance {
            msg!("Invalid bet {:?} {:?}", (needed_amount as u64), balance); //0.0001 sol
            return Err(error!(ErrorCode::Unauthorized));
        }

        msg!(
            "Sending {:?} from {:?} to {:?}",
            amount,
            sender.key,
            receiver.key
        );

        invoke(
            &system_instruction::transfer(sender.key, receiver.key, amount),
            &[
                sender.clone(),
                receiver.clone(),
                system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn spl_transfer(
        ctx: Context<SplTransfer>,
        transfer_amount: u64,
        needed_amount: u64,
    ) -> Result<()> {
        let token_program = ctx.accounts.token_program.to_account_info();

        let sender = ctx.accounts.sender.to_account_info();
        let sender_account = ctx.accounts.sender_account.clone();
        let receiver_account = ctx.accounts.receiver_account.clone();

        let account = TokenAccount::try_deserialize(&mut &receiver_account.data.borrow_mut()[..])?;

        msg!(
            "Sending {:?}/{:?} from {:?}",
            transfer_amount,
            needed_amount,
            account.owner.key(),
        );

        if account.amount < transfer_amount || account.amount < needed_amount {
            msg!("Invalid bet {:?} {:?}", transfer_amount, account.amount);
            return Err(error!(ErrorCode::Unauthorized));
        }

        token::transfer(
            CpiContext::new(
                token_program,
                Transfer {
                    from: sender_account,
                    to: receiver_account,
                    authority: sender,
                },
            ),
            transfer_amount,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub sender: Signer<'info>,
    /// CHECK: This is not dangerous but I don't know why
    #[account(mut)]
    pub receiver: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SplTransfer<'info> {
    /// CHECK: This is not dangerous but I don't know why
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    pub sender: Signer<'info>,
    /// CHECK: This is not dangerous but I don't know why
    #[account(mut)]
    pub sender_account: AccountInfo<'info>,
    /// CHECK: This is not dangerous but I don't know why
    #[account(mut)]
    pub receiver_account: AccountInfo<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Receiver not authorized.")]
    Unauthorized,
}