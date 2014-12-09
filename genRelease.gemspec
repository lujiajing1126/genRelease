# Ensure we require the local version and not one we might have installed already
require File.join([File.dirname(__FILE__),'lib','genRelease','version.rb'])
spec = Gem::Specification.new do |s| 
  s.name = 'genRelease'
  s.version = GenRelease::VERSION
  s.author = 'megrez'
  s.email = 'lujiajing1126@gmail.com'
  s.homepage = 'http://megrez.dajipai.org'
  s.platform = Gem::Platform::RUBY
  s.summary = 'A cli tool to generate RSA key-pair and output a recursive filelist'
  s.files = `git ls-files`.split("
")
  s.require_paths << 'lib'
  s.has_rdoc = true
  s.extra_rdoc_files = ['README.rdoc','genRelease.rdoc']
  s.rdoc_options << '--title' << 'genRelease' << '--main' << 'README.rdoc' << '-ri'
  s.bindir = 'bin'
  s.executables << 'genRelease'
  s.add_development_dependency('rake')
  s.add_development_dependency('rdoc')
  s.add_development_dependency('aruba')
  s.add_runtime_dependency('gli','2.12.2')
end
