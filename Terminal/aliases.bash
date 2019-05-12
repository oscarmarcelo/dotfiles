# Show & Hide hidden files
alias showFiles='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hideFiles='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'

# Shortcuts
alias server="cd ~/Dropbox/server"

# Disable & Enable GateKeeper
alias openGate="sudo spctl --master-disable"
alias closeGate="sudo spctl --master-enable"
