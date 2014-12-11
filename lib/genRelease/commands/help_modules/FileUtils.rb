require 'json'
module GenRelease
  module FileUtils
    extend self
    def write(file,content)
      tmpfile = touch file
      tmpfile.flock File::LOCK_EX
      tmpfile.print content
      tmpfile.flock File::LOCK_UN
      tmpfile.close
    end

    def touch file
      File.open(file,'w')
    end

    def format(content)
      content.to_json.to_s
    end
  end
end