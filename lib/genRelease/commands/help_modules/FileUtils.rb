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
      json_arr = []
      content.each do |k,v|
        json_arr << {:file => k.to_s,:md5 => v[:md5].to_s,:sha1 => v[:sha1]}
      end
      json_arr.to_json.to_s
    end
  end
end