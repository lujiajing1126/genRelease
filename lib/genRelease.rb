require 'genRelease/version.rb'

# Add requires for other files you add to your project here, so
# you just need to require this one file in your bin file
module GenRelease
  autoload :FileUtils, 'genRelease/commands/help_modules/FileUtils'
  autoload :OpenSSLUtils, 'genRelease/commands/help_modules/OpenSSLUtils'
  module Commands
    autoload :Sign, 'genRelease/commands/sign'
    autoload :Create, 'genRelease/commands/create'
    autoload :Build, 'genRelease/commands/build'
  end
end
