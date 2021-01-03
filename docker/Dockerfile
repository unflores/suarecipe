FROM buildpack-deps:groovy

ENV NODE_VERSION 14

ENV NODE_OPTIONS --max_old_space_size=4096
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y build-essential bison

RUN apt-get install -y \
    libssl-dev \
    libsodium-dev \
    tzdata \
    iproute2 \
    git \
    curl \
    vim

RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt update \
    && apt install -y yarn

RUN apt-get clean

# Save timestamp of image building
RUN date -u > BUILD_TIME

ENV APP_HOME /var/www
ENV PATH $APP_HOME/bin:$PATH

ENV HOSTNAME development

RUN apt-get update && apt-get install -y \
  less

RUN touch /root/.bashrc
RUN echo "PS1='\u@\h:\w\$ '" >> /root/.bashrc

# webpack is greedy
RUN echo "fs.inotify.max_user_watches = 999999" >> /etc/sysctl.conf
RUN echo "fs.inotify.max_queued_events = 999999" >> /etc/sysctl.conf
RUN echo "fs.inotify.max_user_instances = 999999" >> /etc/sysctl.conf

# working dir
WORKDIR $APP_HOME

# hook up source
ADD . $APP_HOME
